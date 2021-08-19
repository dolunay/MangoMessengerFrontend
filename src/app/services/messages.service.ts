import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiRoute} from "../../consts/Routes";
import {SessionService} from "./session.service";
import {IMessagesService} from "../../types/interfaces/IMessagesService";
import {IGetChatMessagesResponse} from "../../types/responses/IGetChatMessagesResponse";
import {SendMessageCommand} from "../../types/requests/SendMessageCommand";
import {ISendMessageResponse} from "../../types/responses/ISendMessageResponse";
import {IDeleteMessageResponse} from "../../types/responses/IDeleteMessageResponse";
import {IEditMessageResponse} from "../../types/responses/IEditMessageResponse";
import {EditMessageCommand} from "../../types/requests/EditMessageCommand";

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

  deleteMessage(messageId: number): Observable<IDeleteMessageResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.delete<IDeleteMessageResponse>(ApiRoute.route + this.messagesRoute + messageId,
      header);
  }

  editMessage(request: EditMessageCommand): Observable<IEditMessageResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IEditMessageResponse>(ApiRoute.route + this.messagesRoute, request, header);
  }
}
