import {Component, OnInit} from '@angular/core';
import {IGetUserChatsResponse} from "../../../types/Chats/Responses/IGetUserChatsResponse";
import {MangoService} from "../../mango.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IGetChatMessagesResponse} from "../../../types/Messages/Responses/IGetChatMessagesResponse";
import {IMessage} from "../../../types/Messages/Models/IMessage";
import {SendMessageCommand} from "../../../types/Messages/Requests/SendMessageCommand";
import {ISendMessageResponse} from "../../../types/Messages/Responses/ISendMessageResponse";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // @ts-ignore
  getUserChatsResponse: IGetUserChatsResponse;

  // @ts-ignore
  messages: IMessage[] = [];

  activeChatId = 0;
  // @ts-ignore
  activeMessageText: string = '';

  constructor(private service: MangoService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getUserChats().subscribe((data: IGetUserChatsResponse) => {
      this.getUserChatsResponse = data;

      if (!this.getUserChatsResponse.success) {
        this.router.navigateByUrl('main').then(r => r);
      }
    })
  }

  getChatMessages(chatId: number) : void {
    this.service.getChatMessages(chatId).subscribe((data: IGetChatMessagesResponse) => {
      this.messages = data.messages;
      this.activeChatId = chatId;
    })
  }

  sendMessage() : void {
    this.service.sendMessage(new SendMessageCommand(this.activeMessageText, this.activeChatId))
      .subscribe((data: ISendMessageResponse) => {

    })
  }
}
