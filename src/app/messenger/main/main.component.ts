import {Component, OnInit} from '@angular/core';
import {IGetUserChatsResponse} from "../../../types/Chats/Responses/IGetUserChatsResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {IGetChatMessagesResponse} from "../../../types/Messages/Responses/IGetChatMessagesResponse";
import {IMessage} from "../../../types/Messages/Models/IMessage";
import {SendMessageCommand} from "../../../types/Messages/Requests/SendMessageCommand";
import {ISendMessageResponse} from "../../../types/Messages/Responses/ISendMessageResponse";
import {RefreshTokenCommand} from "../../../types/Auth/Requests/RefreshTokenCommand";
import {Tokens} from "../../../consts/Tokens";
import {IRefreshTokenResponse} from "../../../types/Auth/Responses/IRefreshTokenResponse";
import {AuthService} from "../../services/auth.service";
import {ChatsService} from "../../services/chats.service";
import {MessagesService} from "../../services/messages.service";
import {IChat} from "../../../types/Chats/Models/IChat";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // @ts-ignore
  getUserChatsResponse: IGetUserChatsResponse;
  // @ts-ignore
  refreshTokenResponse: IRefreshTokenResponse;

  messages: IMessage[] = [];
  chats: IChat[] = [];

  activeChatId = 0;
  // @ts-ignore
  activeMessageText: string = '';

  activeChatTitle: string = '';
  activeChatMembersCount: number = 0;

  constructor(private authService: AuthService,
              private chatService: ChatsService,
              private messageService: MessagesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {
        this.getUserChatsResponse = data;
        this.chats = data.chats;
      },
      error => {
        if (error && error.status) {
          switch (error.status) {
            case 400:
              this.router.navigateByUrl('login').then(r => r);
              break;
            case 401:
              this.refreshToken();
              setTimeout(() => {
                if (this.refreshTokenResponse.success) {
                  console.log("ok");
                  this.reloadComponent("/main");
                }
              }, 1000);
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

  getChatMessages(chatId: number): void {
    this.messageService.getChatMessages(chatId).subscribe((data: IGetChatMessagesResponse) => {
        this.messages = data.messages;
        this.activeChatId = chatId;
        this.activeChatTitle = this.getUserChatsResponse.chats.filter(x => x.chatId === chatId)[0].title;
      },
      error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              this.router.navigateByUrl('login').then(r => r);
              break;
            case 401:
              this.refreshToken();
              this.getChatMessages(chatId);
              break;
          }
        }
      });
  }

  sendMessage(): void {
    this.messageService.sendMessage(new SendMessageCommand(this.activeMessageText, this.activeChatId))
      .subscribe((data: ISendMessageResponse) => {
      }, error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              this.router.navigateByUrl('login').then(r => r);
              break;
            case 401:
              this.refreshToken();
              this.ngOnInit();
              break;
          }
        }
      });
  }

  refreshToken(): void {
    let refreshToken = localStorage.getItem(Tokens.refreshTokenId);
    this.authService.refreshToken(new RefreshTokenCommand(refreshToken)).subscribe(
      (data: IRefreshTokenResponse) => {
        if (data.success) {
          this.refreshTokenResponse = data;
          localStorage.setItem(Tokens.accessToken, data.accessToken);
          localStorage.setItem(Tokens.refreshTokenId, data.refreshTokenId);
          return;
        }

        this.router.navigateByUrl('login').then(r => r);
      }, error => this.router.navigateByUrl('login').then(r => r)
    )
  }
}
