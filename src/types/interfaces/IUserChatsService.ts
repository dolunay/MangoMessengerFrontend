import {ArchiveChatCommand} from "../requests/ArchiveChatCommand";
import {Observable} from "rxjs";
import {IBaseResponse} from "../responses/IBaseResponse";

export interface IUserChatsService {
  postJoinChat(chatId: string): Observable<IBaseResponse>;

  putArchiveChat(request: ArchiveChatCommand): Observable<IBaseResponse>;

  deleteLeaveChat(chatId: string): Observable<IBaseResponse>;
}
