import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {CommunitiesService} from "../../services/communities.service";
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
import {DocumentsService} from "../../services/documents.service";
import {UpdateChatLogoCommand} from "../../../types/requests/UpdateChatLogoCommand";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {

  private routeChatId = this.route.snapshot.paramMap.get('chatId');
  private userId = this.sessionService.getUserId();
  private connectionBuilder: signalR.HubConnectionBuilder = new signalR.HubConnectionBuilder();
  private connection: signalR.HubConnection = this.connectionBuilder
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(ApiRoute.route + 'notify')
    .build();

  public messages: IMessage[] = [];
  public chats: IChat[] = [];
  public realTimeConnections: string[] = [];
  public editMessageRequest: EditMessageCommand | null = null;
  public replayMessageObject: any | null = null;
  public isLoaded = false;

  public currentUser: IUser = {
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

  public activeChatId = '';

  public activeChat: IChat = {
    roleId: 1,
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

  public chatFilter = 'All Chats';
  public chatSearchQuery = '';
  public messageSearchQuery = '';

  constructor(private sessionService: SessionService,
              private chatService: CommunitiesService,
              private messageService: MessagesService,
              private userChatsService: UserChatsService,
              public userService: UsersService,
              private route: ActivatedRoute,
              private documentService: DocumentsService,
              private router: Router,
              public dialog: MatDialog) {
  }

  openCreateGroupDialog = () => this.dialog.open(CreateGroupDialogComponent);

  ngOnInit(): void {
    this.initializeView();
  }

  initializeView(): void {

    let chatSubscription = this.chatService.getUserChats().subscribe(chatsResponse => {

      this.chats = chatsResponse.chats.filter(x => !x.isArchived && x.communityType !== CommunityType.SecretChat);

      this.connection.start().then(() => {
        this.chats.forEach(x => {
          if (this.realTimeConnections.includes(x.chatId)) {
            return;
          }

          this.connection.invoke("JoinGroup", x.chatId).then(() => this.realTimeConnections.push(x.chatId));
        });

        if (this.userId != null && this.realTimeConnections.includes(this.userId)) {
          return;
        }

        this.connection.invoke("JoinGroup", this.userId).then(r => r);

      }).catch(err => console.error(err.toString()));

      if (this.routeChatId) {
        this.loadMessages(this.routeChatId);
        this.isLoaded = true;
        return;
      }

      const firstChat = this.chats[0];

      if (firstChat) {
        this.loadMessages(firstChat.chatId);
        this.isLoaded = true;
        return;
      }

      if (!this.activeChatId) {
        let userSub = this.userService.getCurrentUser().subscribe(data => this.currentUser = data.user);
      }

      this.isLoaded = true;

    }, error => {
      if (error.status === 403) {
        this.router.navigateByUrl('login').then(r => r);
        return;
      }

      alert(error.error.ErrorMessage);
    });

    this.connection.on("BroadcastMessage", (message: IMessage) => {

      message.self = message.userId == this.userId;
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

  navigateContacts = () => this.router.navigateByUrl('contacts').then(r => r);

  private loadMessages(chatId: string | null): void {
    if (chatId != null) {
      let messagesSub = this.messageService.getChatMessages(chatId).subscribe(response => {
          this.messages = response.messages;
          this.activeChatId = chatId;
          this.activeChat = this.chats.filter(x => x.chatId === this.activeChatId)[0];
          this.scrollToEnd();
        }, error => alert(error.error.ErrorMessage));
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
          this.realTimeConnections.push(chatId);
        });
      }

    });
  }

  scrollToEnd = () => setTimeout(() =>
    document.getElementById('messageList')?.scrollIntoView({block: "end"}));


  onChatFilerClick(filer: string): void {

    let chatsSub = this.chatService.getUserChats().subscribe(getUserChatsResponse => {

      switch (filer) {
        case 'All Chats':
          this.initializeView();
          break;
        case 'Groups':
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
  }

  onSearchClick(): void {
    let searchSub = this.chatService.searchChat(this.chatSearchQuery).subscribe(response => {

      this.chats = response.chats;
      this.chatFilter = 'Search Results';

    }, error => alert(error.error.ErrorMessage));
  }

  onArchiveChatClick(): void {
    let archiveSub = this.userChatsService.archiveCommunity(this.activeChatId).subscribe(_ => {

      this.chats = this.chats.filter(x => x.chatId !== this.activeChatId);

    }, error => alert(error.error.ErrorMessage));
  }

  onLeaveChatClick(): void {
    let deleteSub = this.userChatsService.leaveCommunity(this.activeChatId).subscribe(_ => {

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
        this.router.navigateByUrl('main').then(r => r);
      });

    }, error => alert(error.error.ErrorMessage));
  }

  getMessageComponentClass = (chat: IChat) => chat.chatId === this.activeChatId
    ? 'contacts-item friends active'
    : 'contacts-item friends';


  onEditMessageEvent(event: any) {
    const messageId = event.messageId;
    const messageText = event.messageText;

    if (!messageId || !messageText) {
      return;
    }

    this.editMessageRequest = new EditMessageCommand(messageId, messageText);
  }

  onJoinGroupEvent() {
    this.activeChat.isMember = true;
    this.connection.invoke("JoinGroup", this.activeChatId).then(r => r);
  }

  getChatImageUrl = () => this.activeChat?.chatLogoImageUrl ?? 'assets/media/avatar/3.png';


  filterMessages(): void {

    let searchMessageSub =
      this.messageService.searchMessages(this.activeChatId, this.messageSearchQuery).subscribe(response => {
        this.messages = response.messages;
        this.messageSearchQuery = '';
      }, error => alert(error.error.ErrorMessage));
  }

  onFilterMessageDropdownClick = () => this.loadMessages(this.activeChatId);


  onReplayMessageClick = (event: any) => this.replayMessageObject = {
    messageAuthor: event.messageAuthor,
    messageText: event.messageText
  };


  hasActiveChat = () => this.activeChatId !== '';

  onChangePictureClick(): void {

    const validChat = this.activeChat.communityType === CommunityType.PublicChannel
      || this.activeChat.communityType === CommunityType.PrivateChannel
      || this.activeChat.communityType === CommunityType.ReadOnlyChannel;

    const validRole = this.activeChat.roleId > 1;

    if (!validChat || !validRole) {
      return;
    }

    const dialog = document.getElementById('change-chat-logo');
    dialog?.click();
  }

  onChatLogoChange(event: any): void {
    const file: File = event.target.files[0];

    const properFileFormat = file.name.includes('.jpg')
      || file.name.includes('.png')
      || file.name.includes('.JPG')
      || file.name.includes('.PNG');

    if (!properFileFormat) {
      alert('Wrong file format.');
      return;
    }

    const form = new FormData();
    form.append("formFile", file);

    const uploadDocSub = this.documentService.uploadDocument(form).subscribe(uploadResponse => {
      const chatId = this.activeChatId;
      const image = uploadResponse.fileName;
      const updateChatLogoCommand = new UpdateChatLogoCommand(chatId, image);

      const updateChatLogoSub = this.chatService.updateChatLogo(updateChatLogoCommand).subscribe(response => {
        this.activeChat.chatLogoImageUrl = uploadResponse.fileUrl;
        alert(response.message);
      }, error => alert(error.error.ErrorMessage));
    });
  }

  ngOnDestroy(): void {
    this.connection.stop().then(r => r);
  }
}
