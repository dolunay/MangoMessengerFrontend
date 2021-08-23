import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {ChatsService} from "../../services/chats.service";
import {MessagesService} from "../../services/messages.service";
import {IGetUserChatsResponse} from "../../../types/responses/IGetUserChatsResponse";
import {IGetChatMessagesResponse} from "../../../types/responses/IGetChatMessagesResponse";
import {SendMessageCommand} from "../../../types/requests/SendMessageCommand";
import {ISendMessageResponse} from "../../../types/responses/ISendMessageResponse";
import {IMessage} from "../../../types/models/IMessage";
import {IChat} from "../../../types/models/IChat";
import {GroupType} from "../../../types/enums/GroupType";
import {UserChatsService} from "../../services/user-chats.service";
import {ArchiveChatCommand} from "../../../types/requests/ArchiveChatCommand";
import {IArchiveChatResponse} from "../../../types/responses/IArchiveChatResponse";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // @ts-ignore
  getUserChatsResponse: IGetUserChatsResponse;

  messages: IMessage[] = [];
  chats: IChat[] = [];

  activeChatId = '';
  activeMessageText: string = '';
  activeChatTitle: string = '';
  activeChatMembersCount: number = 0;
  chatFilter = 'All Chats';
  searchQuery = '';

  constructor(private authService: SessionService,
              private chatService: ChatsService,
              private messageService: MessagesService,
              private userChatsService: UserChatsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {
        const routeChatId = this.route.snapshot.paramMap.get('chatId');
        this.getUserChatsResponse = data;
        this.chats = data.chats;

        if (routeChatId) {
          this.getChatMessages(routeChatId);
          return;
        }

        const firstChat = data.chats[0];
        if (firstChat) {
          this.getChatMessages(firstChat.chatId);
        }
      },
      error => {
        alert(error.error.ErrorMessage);
      });
  }

  reloadComponent(component: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([component]).then(r => r);
  }

  getChatMessages(chatId: string): void {
    this.messageService.getChatMessages(chatId).subscribe((data: IGetChatMessagesResponse) => {
        this.messages = data.messages;
        this.activeChatId = chatId;
        const chat = this.getUserChatsResponse.chats.filter(x => x.chatId === chatId)[0];
        this.activeChatTitle = chat.title;
        this.activeChatMembersCount = chat.membersCount;
        this.scrollToEnd();
      },
      error => {
        alert(error.error.ErrorMessage);
      });
  }

  scrollToEnd(): void {
    setTimeout(() => {
      let element = document.getElementById('messageList');
      element?.scrollIntoView({block: "end"});
    }, 0);
  }

  sendMessage(): void {
    this.messageService.sendMessage(new SendMessageCommand(this.activeMessageText, this.activeChatId))
      .subscribe((data: ISendMessageResponse) => {
        this.activeMessageText = '';
        this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {
          this.chats = data.chats;
          this.getChatMessages(this.activeChatId);
        })
      }, error => {
        alert(error.error.ErrorMessage);
      });
  }

  onChatFilerClick(filer: string): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {
      this.getUserChatsResponse = data;
      switch (filer) {
        case 'All Chats':
          this.chats = data.chats.filter(x => !x.isArchived);
          break;
        case 'Groups':
          this.chats = data.chats.filter(x => x.chatType === GroupType.ReadOnlyChannel || x.chatType === GroupType.PublicChannel);
          break;
        case 'Direct Chats':
          this.chats = data.chats.filter(x => x.chatType === GroupType.DirectChat);
          break;
        case 'Archived':
          this.chats = data.chats.filter(x => x.isArchived);
          break;
        default:
          break;
      }
      this.chatFilter = filer;
    });
  }

  onSearchClick(): void {
    this.chatService.searchChat(this.searchQuery).subscribe((data: IGetUserChatsResponse) => {
      this.chats = data.chats;
      this.searchQuery = '';
      this.chatFilter = 'Search Results';
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onArchiveClick(): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {
      const chat = data.chats.filter(x => x.chatId === this.activeChatId)[0];
      const command = new ArchiveChatCommand(this.activeChatId, !chat.isArchived);
      this.userChatsService.putArchiveChat(command).subscribe((data: IArchiveChatResponse) => {
        this.onChatFilerClick('All Chats');
      }, error => {
        alert(error.error.ErrorMessage);
      })
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onDeleteClick(): void {
    console.log(this.activeChatId);
  }
}
