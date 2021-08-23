import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
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

  constructor(private httpClient: HttpClient, private authService: SessionService) {
  }

  getChatMessages(chatId: string): Observable<IGetChatMessagesResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetChatMessagesResponse>(ApiRoute.route + this.messagesRoute + chatId,
      header);
  }

  sendMessage(request: SendMessageCommand): Observable<ISendMessageResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ISendMessageResponse>(ApiRoute.route + this.messagesRoute,
      request, header);
  }

  deleteMessage(messageId: number): Observable<IBaseResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.delete<IBaseResponse>(ApiRoute.route + this.messagesRoute + messageId,
      header);
  }

  editMessage(request: EditMessageCommand): Observable<IBaseResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.messagesRoute, request, header);
  }
}
