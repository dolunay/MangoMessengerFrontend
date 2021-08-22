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

  constructor(private authService: SessionService,
              private chatService: ChatsService,
              private messageService: MessagesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {
        this.getUserChatsResponse = data;
        this.chats = data.chats;
        const lastChat = data.chats[0];
        if (lastChat) {
          this.getChatMessages(lastChat.chatId);
        }
      },
      error => {
        if (error && error.status) {
          switch (error.status) {
            case 409:
              alert(error.message);
              break;
          }
        }
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
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              alert(error.message);
              break;
          }
        }
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
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              alert(error.message);
              break;
          }
        }
      });
  }

  onChatFilerClick(filer: string): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {
      this.getUserChatsResponse = data;
      switch (filer) {
        case 'All Chats':
          this.chats = data.chats;
          break;
        case 'Groups':
          this.chats = data.chats.filter(x => x.chatType === GroupType.ReadOnlyChannel || x.chatType === GroupType.PublicChannel);
          break;
        case 'Direct Chats':
          this.chats = data.chats.filter(x => x.chatType === GroupType.DirectChat);
          break;
        default:
          break;
      }
      this.chatFilter = filer;
    });
  }
}
