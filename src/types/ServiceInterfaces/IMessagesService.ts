import {Observable} from "rxjs";
import {IGetChatMessagesResponse} from "../Messages/Responses/IGetChatMessagesResponse";
import {SendMessageCommand} from "../Messages/Requests/SendMessageCommand";
import {ISendMessageResponse} from "../Messages/Responses/ISendMessageResponse";
import {EditMessageCommand} from "../Messages/Requests/EditMessageCommand";
import {IEditMessageResponse} from "../Messages/Responses/IEditMessageResponse";
import {IDeleteMessageResponse} from "../Messages/Responses/IDeleteMessageResponse";

export interface IMessagesService {
  getChatMessages(chatId: string): Observable<IGetChatMessagesResponse>;

  sendMessage(request: SendMessageCommand): Observable<ISendMessageResponse>;

  editMessage(request: EditMessageCommand): Observable<IEditMessageResponse>;

  deleteMessage(messageId: number): Observable<IDeleteMessageResponse>;
}
