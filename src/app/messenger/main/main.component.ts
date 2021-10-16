import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {ChatsService} from "../../services/chats.service";
import {MessagesService} from "../../services/messages.service";
import {IMessage} from "../../../types/models/IMessage";
import {IChat} from "../../../types/models/IChat";
import {UserChatsService} from "../../services/user-chats.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateGroupDialogComponent} from "../dialogs/create-group-dialog/create-group-dialog.component";
import {CommunityType} from "../../../types/enums/CommunityType";
import * as signalR from '@microsoft/signalr';
import {ApiRoute} from "../../../consts/ApiRoute";
import {Subscription} from "rxjs";
import {IUser} from "../../../types/models/IUser";
import {UsersService} from "../../services/users.service";
import {EditMessageCommand} from "../../../types/requests/EditMessageCommand";
import {IEditMessageNotification} from "../../../types/models/IEditMessageNotification";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {

  messages: IMessage[] = [];
  chats: IChat[] = [];
  subscriptions: Subscription[] = [];
  realTimeConnections: string[] = [];
  editMessageRequest: EditMessageCommand | null = null;

  replayMessageObject: any | null = null;

  isLoaded = false;

  currentUser: IUser = {
    address: "",
    bio: "",
    birthdayDate: "",
    displayName: "",
    email: "",
    facebook: "",
    firstName: "",
    instagram: "",
    lastName: "",
    linkedIn: "",
    phoneNumber: "",
    pictureUrl: "",
    publicKey: 0,
    twitter: "",
    userId: "",
    username: "",
    website: ""
  }

  activeChatId = '';

  activeChat: IChat = {
    communityType: CommunityType.PublicChannel,
    lastMessage: null,
    description: "",
    chatId: "",
    chatLogoImageUrl: "",
    isArchived: false,
    isMember: false,
    membersCount: 0,
    title: ""
  };

  chatFilter = 'All Chats';
  chatSearchQuery = '';
  messageSearchQuery = '';

  private connectionBuilder: signalR.HubConnectionBuilder = new signalR.HubConnectionBuilder();

  private connection: signalR.HubConnection = this.connectionBuilder
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(ApiRoute.route + 'notify')
    .build();

  constructor(private sessionService: SessionService,
              private chatService: ChatsService,
              private messageService: MessagesService,
              private userChatsService: UserChatsService,
              public userService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
    this.connection.stop().then(r => r);
  }

  openCreateGroupDialog(): void {
    this.dialog.open(CreateGroupDialogComponent);
  }

  ngOnInit(): void {
    this.initializeView();
  }

  initializeView(): void {

    let chatSubscription = this.chatService.getUserChats().subscribe(getUserChatsResponse => {
      const routeChatId = this.route.snapshot.paramMap.get('chatId');
      this.chatFilter = 'All Chats';

      this.chats = getUserChatsResponse.chats
        .filter(x => !x.isArchived && x.communityType !== CommunityType.SecretChat);

      this.connection.start().then(() => {
        this.chats.forEach(x => {
          if (this.realTimeConnections.includes(x.chatId)) {
            return;
          }

          this.connection.invoke("JoinGroup", x.chatId)
            .then(() => {
              console.log(`realtime joined chat: ${x.chatId}`);
              this.realTimeConnections.push(x.chatId);
            });
        });

        const userId = this.sessionService.getUserId();

        if (userId != null && this.realTimeConnections.includes(userId)) {
          return;
        }

        this.connection.invoke("JoinGroup", userId)
          .then(() => console.log(`realtime joined user group: ${userId}`));

      }).catch(function (err) {
        return console.error(err.toString());
      });

      if (routeChatId) {
        this.loadMessages(routeChatId);
        this.isLoaded = true;
        return;
      }

      const firstChat = this.chats[0];

      if (firstChat) {
        this.loadMessages(firstChat.chatId);
        this.isLoaded = true;
        return;

      }

      if (this.activeChatId === '') {
        let userSub = this.userService.getCurrentUser().subscribe(data => {
          this.currentUser = data.user;
        });

        this.subscriptions.push(userSub);
      }

      this.isLoaded = true;

    }, error => {
      if (error.status === 403) {
        this.router.navigateByUrl('login').then(r => r);
        return;
      }

      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(chatSubscription);

    this.connection.on("BroadcastMessage", (message: IMessage) => {
      const userId = this.sessionService.getUserId();
      message.self = message.userId == userId;
      let chat = this.chats.filter(x => x.chatId === message.chatId)[0];
      chat.lastMessage = message;
      this.chats = this.chats.filter(x => x.chatId !== message.chatId);
      this.chats = [chat, ...this.chats];

      if (message.chatId === this.activeChatId) {
        this.messages.push(message);
      }

      this.scrollToEnd();
    });

    this.connection.on("UpdateUserChats", (chat: IChat) => {
      this.chats.push(chat);
    });

    this.connection.on('NotifyOnMessageDelete', (messageId: string) => {
      this.messages = this.messages.filter(x => x.messageId !== messageId);
    });

    this.connection.on('NotifyOnMessageEdit', (request: IEditMessageNotification) => {
      let message = this.messages.filter(x => x.messageId === request.messageId)[0];

      if (message) {
        message.messageText = request.modifiedText;
        message.updatedAt = request.updatedAt;
      }
    });
  }

  navigateContacts(): void {
    this.router.navigateByUrl('contacts').then(r => r);
  }

  private loadMessages(chatId: string | null): void {
    if (chatId != null) {
      let messagesSub = this.messageService.getChatMessages(chatId).subscribe(getMessagesResponse => {
          this.messages = getMessagesResponse.messages;
          this.activeChatId = chatId;
          this.activeChat = this.chats.filter(x => x.chatId === this.activeChatId)[0];
          this.scrollToEnd();
        },
        error => {
          alert(error.error.ErrorMessage);
        });

      this.subscriptions.push(messagesSub);
    }
  }

  navigateToChat(chatId: string): void {
    if (this.activeChatId === chatId) {
      return;
    }

    this.router.navigate(['main', {chatId: chatId}]).then(() => {
      this.loadMessages(chatId);

      if (!this.realTimeConnections.includes(chatId)) {
        this.connection.invoke("JoinGroup", chatId).then(() => {
          console.log('missing group connected to realtime.');
          this.realTimeConnections.push(chatId);
        });
      }

    });
  }

  scrollToEnd(): void {
    setTimeout(() => {
      let element = document.getElementById('messageList');
      element?.scrollIntoView({block: "end"});
    }, 0);
  }

  onChatFilerClick(filer: string): void {
    let chatsSub = this.chatService.getUserChats().subscribe(getUserChatsResponse => {

      switch (filer) {
        case 'All Chats':
          this.initializeView();
          break;
        case 'Groups':
          console.log(getUserChatsResponse.chats);
          this.chats = getUserChatsResponse.chats.filter(x => x.communityType === CommunityType.ReadOnlyChannel
            || x.communityType === CommunityType.PublicChannel
            || x.communityType === CommunityType.PrivateChannel);
          break;
        case 'Direct Chats':
          this.chats = getUserChatsResponse.chats.filter(x => x.communityType === CommunityType.DirectChat);
          break;
        case 'Archived':
          this.chats = getUserChatsResponse.chats.filter(x => x.isArchived);
          break;
        default:
          break;
      }

      this.chatFilter = filer;
      this.chatSearchQuery = '';
    });

    this.subscriptions.push(chatsSub);
  }

  onSearchClick(): void {
    let searchSub = this.chatService.searchChat(this.chatSearchQuery).subscribe(getUserChatsResponse => {
      this.chats = getUserChatsResponse.chats;
      this.chatFilter = 'Search Results';
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(searchSub);
  }

  onArchiveChatClick(): void {
    let archiveSub = this.userChatsService.putArchiveChat(this.activeChatId).subscribe(_ => {
      this.chats = this.chats.filter(x => x.chatId !== this.activeChatId);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(archiveSub);
  }

  onLeaveChatClick(): void {
    let deleteSub = this.userChatsService.deleteLeaveChat(this.activeChatId).subscribe(_ => {
      this.chats = this.chats.filter(x => x.chatId !== this.activeChatId);

      if (this.chats[0]) {
        this.activeChatId = this.chats[0].chatId;
        this.router.navigateByUrl('main').then(r => r);
        this.loadMessages(this.activeChatId);
        return;
      }

      this.activeChatId = '';
      let userSub = this.userService.getCurrentUser().subscribe(data => {
        this.currentUser = data.user;
      });

      this.subscriptions.push(userSub);
      this.subscriptions.push(deleteSub);

      this.router.navigateByUrl('main').then(r => r);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(deleteSub);
  }

  getMessageComponentClass(chat: IChat): string {
    return chat.chatId === this.activeChatId ? 'contacts-item friends active' : 'contacts-item friends';
  }

  onEditMessageEvent(event: any) {
    const messageId = event.messageId;
    const messageText = event.messageText;

    if (!messageId || !messageText) {
      return;
    }

    this.editMessageRequest = new EditMessageCommand(messageId, messageText);
    console.log('main edit event command', this.editMessageRequest);
  }

  onJoinGroupEvent() {
    this.activeChat.isMember = true;
    this.connection.invoke("JoinGroup", this.activeChatId).then(r => r);
  }

  getChatImageUrl(): string {
    return this.activeChat?.chatLogoImageUrl ?? 'assets/media/avatar/3.png';
  }

  filterMessages(): void {
    let searchMessageSub = this.messageService.searchMessages(this.activeChatId, this.messageSearchQuery)
      .subscribe(response => {
        this.messages = response.messages;
        this.messageSearchQuery = '';
      }, error => {
        alert(error.error.ErrorMessage);
      });

    this.subscriptions.push(searchMessageSub);
  }

  onFilterMessageDropdownClick(): void {
    this.loadMessages(this.activeChatId);
  }

  onReplayMessageClick(event: any): void {
    console.log('event', event);

    this.replayMessageObject = {
      messageAuthor: event.messageAuthor,
      messageText: event.messageText
    };

    console.log('main replay user name', this.replayMessageObject.messageAuthor)
  }

  hasActiveChat(): boolean {
    return this.activeChatId !== '';
  }

  onChangePictureClick(): void {
    const dialog = document.getElementById('change-chat-logo');
    dialog?.click();
  }
}
