import {Observable} from "rxjs";
import {IBaseResponse} from "../responses/IBaseResponse";

export interface IUserChatsService {
  postJoinChat(chatId: string): Observable<IBaseResponse>;

  putArchiveChat(chatId: string): Observable<IBaseResponse>;

  deleteLeaveChat(chatId: string): Observable<IBaseResponse>;
}
