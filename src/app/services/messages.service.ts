import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMessagesService} from "../../types/interfaces/IMessagesService";
import {IGetChatMessagesResponse} from "../../types/responses/IGetChatMessagesResponse";
import {SendMessageCommand} from "../../types/requests/SendMessageCommand";
import {ISendMessageResponse} from "../../types/responses/ISendMessageResponse";
import {EditMessageCommand} from "../../types/requests/EditMessageCommand";
import {ApiRoute} from "../../consts/ApiRoute";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class MessagesService implements IMessagesService {
  private messagesRoute = 'api/messages/'

  constructor(private httpClient: HttpClient) {
  }

  getChatMessages(chatId: string): Observable<IGetChatMessagesResponse> {
    return this.httpClient.get<IGetChatMessagesResponse>(ApiRoute.route + this.messagesRoute + chatId);
  }

  sendMessage(request: SendMessageCommand): Observable<ISendMessageResponse> {
    return this.httpClient.post<ISendMessageResponse>(ApiRoute.route + this.messagesRoute, request);
  }

  deleteMessage(messageId: number): Observable<IBaseResponse> {
    return this.httpClient.delete<IBaseResponse>(ApiRoute.route + this.messagesRoute + messageId);
  }

  editMessage(request: EditMessageCommand): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.messagesRoute, request);
  }
}
