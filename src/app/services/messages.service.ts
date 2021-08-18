import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domain, MessagesRoutes} from "../../consts/Routes";
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

  constructor(private httpClient: HttpClient, private authService: SessionService) {
  }

  getChatMessages(chatId: string): Observable<IGetChatMessagesResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetChatMessagesResponse>(Domain.route + MessagesRoutes.route + chatId, header);
  }

  sendMessage(request: SendMessageCommand): Observable<ISendMessageResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ISendMessageResponse>(Domain.route + MessagesRoutes.route, request, header);
  }

  deleteMessage(messageId: number): Observable<IDeleteMessageResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.delete<IDeleteMessageResponse>(Domain.route + MessagesRoutes.route + messageId, header);
  }

  editMessage(request: EditMessageCommand): Observable<IEditMessageResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IEditMessageResponse>(Domain.route + MessagesRoutes.route, request, header);
  }
}
