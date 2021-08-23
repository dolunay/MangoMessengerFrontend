import {ArchiveChatCommand} from "../requests/ArchiveChatCommand";
import {Observable} from "rxjs";
import {IArchiveChatResponse} from "../responses/IArchiveChatResponse";
import {IJoinGroupResponse} from "../responses/IJoinGroupResponse";

export interface IUserChatsService {
  postJoinChat(chatId: string): Observable<IJoinGroupResponse>;

  putArchiveChat(request: ArchiveChatCommand): Observable<IArchiveChatResponse>;
}
