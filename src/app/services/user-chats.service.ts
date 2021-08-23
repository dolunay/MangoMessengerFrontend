import {Injectable} from '@angular/core';
import {IUserChatsService} from "../../types/interfaces/IUserChatsService";
import {Observable} from "rxjs";
import {IJoinGroupResponse} from "../../types/responses/IJoinGroupResponse";
import {ArchiveChatCommand} from "../../types/requests/ArchiveChatCommand";
import {IArchiveChatResponse} from "../../types/responses/IArchiveChatResponse";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class UserChatsService implements IUserChatsService {

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
  }

  postJoinChat(chatId: string): Observable<IJoinGroupResponse> {
    // @ts-ignore
    return undefined;
  }

  putArchiveChat(request: ArchiveChatCommand): Observable<IArchiveChatResponse> {
    // @ts-ignore
    return undefined;
  }
}
