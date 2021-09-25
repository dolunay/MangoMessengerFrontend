import {Injectable} from '@angular/core';
import {IUserChatsService} from "../../types/interfaces/IUserChatsService";
import {Observable} from "rxjs";
import {ArchiveChatCommand} from "../../types/requests/ArchiveChatCommand";
import {HttpClient} from "@angular/common/http";
import {ApiRoute} from "../../consts/ApiRoute";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class UserChatsService implements IUserChatsService {
  private userChatsRoute = 'api/user-chats/';

  constructor(private httpClient: HttpClient) {
  }

  postJoinChat(chatId: string): Observable<IBaseResponse> {
    return this.httpClient.post<IBaseResponse>(ApiRoute.route + this.userChatsRoute + chatId, {});
  }

  putArchiveChat(chatId: string): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.userChatsRoute + chatId, {});
  }

  deleteLeaveChat(chatId: string): Observable<IBaseResponse> {
    return this.httpClient.delete<IBaseResponse>(ApiRoute.route + this.userChatsRoute + chatId);
  }
}
