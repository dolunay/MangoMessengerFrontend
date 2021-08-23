import {Injectable} from '@angular/core';
import {IUserChatsService} from "../../types/interfaces/IUserChatsService";
import {Observable} from "rxjs";
import {ArchiveChatCommand} from "../../types/requests/ArchiveChatCommand";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "./session.service";
import {ApiRoute} from "../../consts/ApiRoute";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class UserChatsService implements IUserChatsService {
  private userChatsRoute = 'api/user-chats/';

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
  }

  postJoinChat(chatId: string): Observable<IBaseResponse> {
    const accessToken = this.sessionService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<IBaseResponse>(ApiRoute.route + this.userChatsRoute + chatId, {}, header);
  }

  putArchiveChat(request: ArchiveChatCommand): Observable<IBaseResponse> {
    const accessToken = this.sessionService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.userChatsRoute, request, header);
  }

  deleteLeaveChat(chatId: string): Observable<IBaseResponse> {
    const accessToken = this.sessionService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.delete<IBaseResponse>(ApiRoute.route + this.userChatsRoute + chatId, header);
  }
}
