import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domain, MessagesRoutes} from "../../consts/Routes";
import {Tokens} from "../../consts/Tokens";
import {IGetChatMessagesResponse} from "../../types/Messages/Responses/IGetChatMessagesResponse";
import {SendMessageCommand} from "../../types/Messages/Requests/SendMessageCommand";
import {ISendMessageResponse} from "../../types/Messages/Responses/ISendMessageResponse";
import {IMessagesService} from "../../types/ServiceInterfaces/IMessagesService";
import {IDeleteMessageResponse} from "../../types/Messages/Responses/IDeleteMessageResponse";
import {EditMessageCommand} from "../../types/Messages/Requests/EditMessageCommand";
import {IEditMessageResponse} from "../../types/Messages/Responses/IEditMessageResponse";

@Injectable({
  providedIn: 'root'
})
export class MessagesService implements IMessagesService {

  constructor(private httpClient: HttpClient) {
  }

  getChatMessages(chatId: string): Observable<IGetChatMessagesResponse> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem(Tokens.accessToken)}`)
    };
    return this.httpClient.get<IGetChatMessagesResponse>(Domain.route + MessagesRoutes.getChatMessages + chatId, header);
  }

  sendMessage(request: SendMessageCommand): Observable<ISendMessageResponse> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem(Tokens.accessToken)}`)
    };
    return this.httpClient.post<ISendMessageResponse>(Domain.route + MessagesRoutes.postMessage, request, header);
  }

  deleteMessage(messageId: number): Observable<IDeleteMessageResponse> {
    // @ts-ignore
    return undefined;
  }

  editMessage(request: EditMessageCommand): Observable<IEditMessageResponse> {
    // @ts-ignore
    return undefined;
  }
}
