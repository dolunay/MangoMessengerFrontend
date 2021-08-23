import {Injectable} from '@angular/core';
import {IUserChatsService} from "../../types/interfaces/IUserChatsService";
import {Observable} from "rxjs";
import {IJoinGroupResponse} from "../../types/responses/IJoinGroupResponse";
import {ArchiveChatCommand} from "../../types/requests/ArchiveChatCommand";
import {IArchiveChatResponse} from "../../types/responses/IArchiveChatResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "./session.service";
import {ApiRoute} from "../../consts/ApiRoute";

@Injectable({
  providedIn: 'root'
})
export class UserChatsService implements IUserChatsService {
  private userChatsRoute = 'api/user-chats/';

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
  }

  postJoinChat(chatId: string): Observable<IJoinGroupResponse> {
    const accessToken = this.sessionService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<IJoinGroupResponse>(ApiRoute.route + this.userChatsRoute + chatId, {}, header);
  }

  putArchiveChat(request: ArchiveChatCommand): Observable<IArchiveChatResponse> {
    const accessToken = this.sessionService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IArchiveChatResponse>(ApiRoute.route + this.userChatsRoute, request, header);
  }
}
