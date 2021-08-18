import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domain, MessagesRoutes} from "../../consts/Routes";
import {IGetChatMessagesResponse} from "../../types/Messages/Responses/IGetChatMessagesResponse";
import {SendMessageCommand} from "../../types/Messages/Requests/SendMessageCommand";
import {ISendMessageResponse} from "../../types/Messages/Responses/ISendMessageResponse";
import {IMessagesService} from "../../types/ServiceInterfaces/IMessagesService";
import {IDeleteMessageResponse} from "../../types/Messages/Responses/IDeleteMessageResponse";
import {EditMessageCommand} from "../../types/Messages/Requests/EditMessageCommand";
import {IEditMessageResponse} from "../../types/Messages/Responses/IEditMessageResponse";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MessagesService implements IMessagesService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getChatMessages(chatId: string): Observable<IGetChatMessagesResponse> {
    let accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetChatMessagesResponse>(Domain.route + MessagesRoutes.route + chatId, header);
  }

  sendMessage(request: SendMessageCommand): Observable<ISendMessageResponse> {
    let accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ISendMessageResponse>(Domain.route + MessagesRoutes.route, request, header);
  }

  deleteMessage(messageId: number): Observable<IDeleteMessageResponse> {
    let accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.delete<IDeleteMessageResponse>(Domain.route + MessagesRoutes.route + messageId, header);
  }

  editMessage(request: EditMessageCommand): Observable<IEditMessageResponse> {
    // @ts-ignore
    return undefined;
  }
}
