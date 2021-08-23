import {Observable} from "rxjs";
import {IGetChatMessagesResponse} from "../responses/IGetChatMessagesResponse";
import {ISendMessageResponse} from "../responses/ISendMessageResponse";
import {SendMessageCommand} from "../requests/SendMessageCommand";
import {EditMessageCommand} from "../requests/EditMessageCommand";
import {IBaseResponse} from "../responses/IBaseResponse";

export interface IMessagesService {
  getChatMessages(chatId: string): Observable<IGetChatMessagesResponse>;

  sendMessage(request: SendMessageCommand): Observable<ISendMessageResponse>;

  editMessage(request: EditMessageCommand): Observable<IBaseResponse>;

  deleteMessage(messageId: number): Observable<IBaseResponse>;
}
