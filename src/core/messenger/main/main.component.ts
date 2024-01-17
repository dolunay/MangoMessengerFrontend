import type { OnDestroy, OnInit } from '@angular/core';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@microsoft/signalr';
import { FormsModule } from '@angular/forms';
import {
	CommunitiesService,
	ErrorNotificationService,
	MessagesService,
	SessionService,
	UserChatsService,
	UsersService,
	ValidationService,
} from '@core/services';
import { CreateGroupDialogComponent } from '@core/messenger/dialogs/create-group-dialog';
import type {
	IChat,
	IDeleteMessageNotification,
	IEditMessageNotification,
	IMessage,
	IUser,
} from '@shared/types/models';

import { CommunityType } from '@shared/types/enums';

import type { EditMessageCommand } from '@shared/types/requests';
import { EMPTY, catchError, combineLatestWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	ChatFooterComponent,
	ChatItemActiveComponent,
	JoinGroupComponent,
	NavigationBarComponent,
	ReceivedMessageComponent,
} from '@core/messenger';
import { MatImports } from '@shared/mat-imports/mat-iьports';
import { NgClass } from '@angular/common';
import type { IGetUserChatsResponse } from '@shared/types/responses/IGetUserChatsResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	standalone: true,
	imports: [
		FormsModule,
		ChatItemActiveComponent,
		ReceivedMessageComponent,
		ChatFooterComponent,
		JoinGroupComponent,
		...MatImports,
		NavigationBarComponent,
		NgClass,
	],
	providers: [MatDialog],
})
export class MainComponent implements OnInit, OnDestroy {
	private readonly sessionService = inject(SessionService);
	private readonly chatService = inject(CommunitiesService);
	private readonly messageService = inject(MessagesService);
	private readonly userChatsService = inject(UserChatsService);
	private readonly route = inject(ActivatedRoute);
	private readonly validationService = inject(ValidationService);
	private readonly errorNotificationService = inject(ErrorNotificationService);
	private readonly routeChatId = this.route.snapshot.paramMap.get('chatId');
	private readonly router = inject(Router);
	private readonly userId: string | undefined = this.sessionService.getTokens()?.userId;
	private readonly connectionBuilder: signalR.HubConnectionBuilder = new signalR.HubConnectionBuilder();
	private readonly snackBar = inject(MatSnackBar);
	private readonly connection: signalR.HubConnection = this.connectionBuilder
		.configureLogging(signalR.LogLevel.Information)
		.withUrl(`${environment.baseUrl}notify`)
		.build();

	private readonly destroyRef = inject(DestroyRef);
	private signalRConnected = false;

	userService = inject(UsersService);
	dialog = inject(MatDialog);

	messages: IMessage[] = [];
	chats: IChat[] = [];
	realTimeConnections: string[] = [];
	editMessageRequest: EditMessageCommand | null = null;
	replayMessageObject: any | null = null;
	activeChatId = '';
	chatFilter = 'All Chats';
	chatSearchQuery = '';
	messageSearchQuery = '';
	messageInputOpened = false;

	currentUser: IUser = {} as IUser;

	image = this.userService.getUserProfilePicture(this.currentUser);

	activeChat: IChat | null = {
		communityType: CommunityType.PublicChannel,
	} as IChat | null;

	openCreateGroupDialog = () => this.dialog.open(CreateGroupDialogComponent);

	ngOnInit(): void {
		this.initializeView();
	}

	initializeView() {
		const userId = this.userId as string;
		this.chatService
			.getUserChats()
			.pipe(
				combineLatestWith(this.userService.getUserById(userId)),
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);

					if (error.status === 403 || error.status === 0) this.router.navigateByUrl('login').then((r) => r);
					return EMPTY;
				}),
			)
			.subscribe(([chatsResponse, data]) => {
				this.chats = chatsResponse.chats.filter((x: any) => !x.isArchived);

				if (this.connection.state !== signalR.HubConnectionState.Connected) this.connectChatsToHub();

				if (this.routeChatId) {
					this.loadMessages(this.routeChatId);
					return;
				}

				const firstChat = this.chats[0];

				if (firstChat) {
					this.loadMessages(firstChat.chatId);
					return;
				}

				if (!this.activeChatId) this.currentUser = data.user;
			});

		if (!this.signalRConnected) {
			this.setSignalRMethods();
			this.signalRConnected = true;
		}
	}

	connectChatsToHub(): void {
		this.connection
			.start()
			.then(() => {
				this.chats.forEach((x) => {
					if (this.realTimeConnections.includes(x.chatId)) return;

					this.connection.invoke('JoinGroup', x.chatId).then(() => this.realTimeConnections.push(x.chatId));
				});

				if (this.userId != null && this.realTimeConnections.includes(this.userId)) return;

				this.connection.invoke('JoinGroup', this.userId).then((r) => r);
			})
			.catch((err) => console.error(err.toString()));
	}

	setSignalRMethods(): void {
		this.connection.on('BroadcastMessageAsync', (message: IMessage) => this.onBroadcastMessage(message));

		this.connection.on('UpdateUserChatsAsync', (chat: IChat) => this.chats.push(chat));

		this.connection.on('NotifyOnMessageDeleteAsync', (notification: IDeleteMessageNotification) => {
			const message = this.messages.filter((x) => x.messageId === notification.messageId)[0];

			if (message.messageId === this.activeChat?.lastMessageId) this.activeChat = { ...message } as unknown as IChat;

			this.messages = this.messages.filter((x) => x.messageId !== notification.messageId);
		});

		this.connection.on('NotifyOnMessageEditAsync', (notification: IEditMessageNotification) => {
			const message = this.messages.filter((x) => x.messageId === notification.messageId)[0];

			if (message) {
				message.messageText = notification.modifiedText;
				message.updatedAt = notification.updatedAt;
			}

			if (notification.isLastMessage) this.activeChat = { ...notification } as unknown as IChat;
		});
	}

	onBroadcastMessage(message: IMessage): void {
		message.self = message.userId === (this.userId as string);
		const chat = this.chats.filter((x) => x.chatId === message.chatId)[0];
		chat.lastMessageAuthor = message.userDisplayName;
		chat.lastMessageText = message.messageText;
		chat.lastMessageTime = message.createdAt;
		chat.lastMessageId = message.messageId;
		this.chats = this.chats.filter((x) => x.chatId !== message.chatId);
		this.chats = [chat, ...this.chats];

		if (message.chatId === this.activeChatId) this.messages.push(message);

		this.scrollToEnd();
	}

	navigateContacts = () => this.router.navigateByUrl('contacts').then((r) => r);

	private loadMessages(chatId: string | null): void {
		if (chatId == null) return;
		this.messageService
			.getChatMessages(chatId)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((response) => {
				this.messages = response.messages;
				this.activeChatId = chatId;
				const chat = this.chats.filter((x) => x.chatId === this.activeChatId)[0];
				this.activeChat = { ...chat };
				this.scrollToEnd();
			});
	}

	navigateToChat(chatId: string): void {
		if (this.activeChatId === chatId) return;

		this.router.navigate(['main', { chatId }]).then(() => {
			this.loadMessages(chatId);

			if (!this.realTimeConnections.includes(chatId)) {
				this.connection.invoke('JoinGroup', chatId).then(() => {
					this.realTimeConnections.push(chatId);
				});
			}
		});
	}

	scrollToEnd = () => setTimeout(() => document.getElementById('messageList')?.scrollIntoView({ block: 'end' }));

	onChatFilerClick(filer: string): void {
		this.chatService.getUserChats().subscribe((getUserChatsResponse) => {
			this.filterChats(filer, getUserChatsResponse);
			this.chatFilter = filer;
			this.chatSearchQuery = '';
		});
	}

	private filterChats(filter: string, getUserChatsResponse: IGetUserChatsResponse) {
		const filters: Record<string, (chats: IChat[]) => IChat[]> = {
			'All Chats': () => {
				this.initializeView();
				return [];
			},
			Groups: (chats: IChat[]) => {
				return chats.filter((x: IChat) => !x.isArchived && x.communityType === CommunityType.PublicChannel);
			},
			'Direct Chats': (chats: IChat[]) => {
				return chats.filter((x: IChat) => x.communityType === CommunityType.DirectChat);
			},
			Archived: (chats: IChat[]) => {
				return chats.filter((x: IChat) => x.isArchived);
			},
		};

		const filterFunction = filters[filter];
		if (filterFunction) this.chats = filterFunction(getUserChatsResponse.chats);
	}

	onSearchClick(): void {
		this.validationService.validateField(this.chatSearchQuery, 'Chat Search');
		this.chatService
			.searchChat(this.chatSearchQuery)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((response) => {
				this.chats = response.chats;
				this.chatFilter = 'Search Results';
				this.chatSearchQuery = '';
			});
	}

	onArchiveChatClick(): void {
		this.userChatsService
			.archiveCommunity(this.activeChatId)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
			)
			.subscribe((_) => {
				this.chats = this.chats.filter((x) => x.chatId !== this.activeChatId);
			});
	}

	onLeaveChatClick(): void {
		const userId = this.userId as string;

		this.userChatsService
			.leaveCommunity(this.activeChatId)
			.pipe(
				combineLatestWith(this.userService.getUserById(userId)),
				catchError((err) => {
					this.errorNotificationService.notifyOnError(err);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(([_, data]) => {
				this.chats = this.chats.filter((x) => x.chatId !== this.activeChatId);

				if (this.chats[0]) {
					this.reassignChatData();
					return;
				}
				this.activeChatId = '';
				this.currentUser = { ...data.user };
			});
	}

	private reassignChatData() {
		this.activeChatId = this.chats[0].chatId;
		this.router.navigateByUrl('main').then((r) => r);
		this.loadMessages(this.activeChatId);
	}

	getMessageComponentClass = (chat: IChat) =>
		chat.chatId === this.activeChatId ? 'contacts-item friends active' : 'contacts-item friends';

	onEditMessageEvent(event: any) {
		if (!this.activeChat?.isMember) {
			this.snackBar.open('You are not a member of the chat to edit messages.');
			return;
		}

		const messageId = event.messageId;
		const messageText = event.messageText;

		if (!messageId || !messageText) return;

		const chatId = this.activeChatId;
		this.editMessageRequest = { messageId, modifiedText: messageText, chatId };
	}

	onJoinGroupEvent() {
		(this.activeChat as IChat).isMember = true;
		this.chatFilter = 'All Chats';
		this.initializeView();
	}

	getChatImageUrl = () => this.activeChat?.chatLogoImageUrl ?? 'assets/media/avatar/3.png';

	filterMessages(): void {
		this.validationService.validateField(this.messageSearchQuery, 'Chat Search');
		this.messageService
			.searchMessages(this.activeChatId, this.messageSearchQuery)
			.pipe(
				catchError((err) => {
					this.errorNotificationService.notifyOnError(err);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((response) => {
				this.messages = response.messages;
				this.messageSearchQuery = '';
			});
	}

	onFilterMessageDropdownClick() {
		this.loadMessages(this.activeChatId);
		this.messageInputOpened = !this.messageInputOpened;
	}

	onReplayMessageClick = (event: any) => {
		if (!this.activeChat?.isMember) {
			this.snackBar.open('You are not a member of the chat to reply messages.');
			return;
		}

		return (this.replayMessageObject = {
			messageAuthor: event.messageAuthor,
			messageText: event.messageText,
		});
	};

	hasActiveChat = () => this.activeChatId !== '';

	onChangePictureClick(): void {
		const validChat = this.activeChat?.communityType === CommunityType.PublicChannel;

		const validRole = Number(this.activeChat?.roleId) > 1;

		if (!validChat || !validRole) return;

		const dialog = document.getElementById('change-chat-logo');
		dialog?.click();
	}

	onChatImageChange(event: any): void {
		const file: File = event.target.files[0];

		if (file === null || file === undefined) return;

		const split = file.name.split('.');
		const extension = split.pop();

		const properFileFormat = extension === 'jpg' || extension === 'JPG' || extension === 'png' || extension === 'PNG';

		if (!properFileFormat) {
			this.snackBar.open('Wrong file format.');
			return;
		}

		const form = new FormData();
		form.append('newGroupPicture', file);

		const chatId = this.activeChatId;

		this.chatService
			.updateChatLogo(chatId, form)
			.pipe(
				catchError((err) => {
					this.errorNotificationService.notifyOnError(err);

					return EMPTY;
				}),
			)
			.subscribe((response) => {
				(this.activeChat as IChat).chatLogoImageUrl = response.updatedLogoUrl as string;
				this.snackBar.open(response.message);
			});
	}

	ngOnDestroy(): void {
		this.connection.stop().then((r) => r);
	}
}
