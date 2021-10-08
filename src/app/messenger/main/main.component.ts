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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {

  messages: IMessage[] = [];
  chats: IChat[] = [];
  subscriptions: Subscription[] = [];

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
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  openCreateGroupDialog(): void {
    this.dialog.open(CreateGroupDialogComponent);
  }

  ngOnInit(): void {
    this.initializeView();

    this.connection.start().then(() => {
      this.chats.forEach(x => {
        this.connection.invoke("JoinChatGroup", x.chatId).then(r => r);
      });

      const userId = this.sessionService.getUserId();
      this.connection.invoke("ConnectUser", userId).then(r => r);
    }).catch(function (err) {
      return console.error(err.toString());
    });

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
    })
  }

  initializeView(): void {
    let chatSubscription = this.chatService.getUserChats().subscribe(getUserChatsResponse => {
      const routeChatId = this.route.snapshot.paramMap.get('chatId');
      this.chatFilter = 'All Chats';

      this.chats = getUserChatsResponse.chats
        .filter(x => !x.isArchived && x.communityType !== CommunityType.SecretChat);

      if (routeChatId) {
        this.loadMessages(routeChatId);
        return;
      }

      const firstChat = this.chats[0];
      console.log(firstChat);

      if (firstChat) {
        this.loadMessages(firstChat.chatId);
      }

    }, error => {
      if (error.status === 403) {
        this.router.navigateByUrl('login').then(r => r);
        return;
      }

      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(chatSubscription);
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
      this.router.navigate(['main']).then(() => this.initializeView());
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(deleteSub);
  }

  getMessageComponentClass(chat: IChat): string {
    return chat.chatId === this.activeChatId ? 'contacts-item friends active' : 'contacts-item friends';
  }

  onDeleteMessageEvent(messageId: string) {
    this.messages = this.messages.filter(x => x.messageId !== messageId);
  }

  onJoinGroupEvent() {
    this.activeChat.isMember = true;
    this.connection.invoke("JoinChatGroup", this.activeChatId).then(r => r);
  }

  noActiveChat(): boolean {
    return this.activeChatId !== '';
  }

  getChatImageUrl(): string {
    return this.activeChat.chatLogoImageUrl ?? 'assets/media/avatar/3.png';
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
}
