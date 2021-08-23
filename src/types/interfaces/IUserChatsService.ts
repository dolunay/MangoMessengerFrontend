import {ArchiveChatCommand} from "../requests/ArchiveChatCommand";
import {Observable} from "rxjs";
import {IArchiveChatResponse} from "../responses/IArchiveChatResponse";
import {IJoinGroupResponse} from "../responses/IJoinGroupResponse";
import {IBaseResponse} from "../responses/IBaseResponse";

export interface IUserChatsService {
  postJoinChat(chatId: string): Observable<IJoinGroupResponse>;

  putArchiveChat(request: ArchiveChatCommand): Observable<IArchiveChatResponse>;

  deleteLeaveChat(chatId: string): Observable<IBaseResponse>;
}
