import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiRoute} from "../../consts/ApiRoute";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class UserChatsService {
  private userChatsRoute = 'api/user-chats/';

  constructor(private httpClient: HttpClient) {
  }

  // POST /api/user-chats/{chatId}
  joinCommunity(chatId: string): Observable<IBaseResponse> {
    return this.httpClient.post<IBaseResponse>(ApiRoute.route + this.userChatsRoute + chatId, {});
  }

  // PUT /api/user-chats/{chatId}
  archiveCommunity(chatId: string): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.userChatsRoute + chatId, {});
  }

  // DELETE /api/user-chats/{chatId}
  leaveCommunity(chatId: string): Observable<IBaseResponse> {
    return this.httpClient.delete<IBaseResponse>(ApiRoute.route + this.userChatsRoute + chatId);
  }
}
