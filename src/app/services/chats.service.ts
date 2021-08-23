import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {IChatsService} from "../../types/interfaces/IChatsService";
import {IGetUserChatsResponse} from "../../types/responses/IGetUserChatsResponse";
import {ICreateDirectChatResponse} from "../../types/responses/ICreateDirectChatResponse";
import {ICreateGroupResponse} from "../../types/responses/ICreateGroupResponse";
import {CreateGroupCommand} from "../../types/requests/CreateGroupCommand";
import {ApiRoute} from "../../consts/ApiRoute";

@Injectable({
  providedIn: 'root'
})
export class ChatsService implements IChatsService {
  private chatsRoute = 'api/chats/'

  constructor(private httpClient: HttpClient, private authService: SessionService) {
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.route + this.chatsRoute, header);
  }

  createDirectChat(userId: string): Observable<ICreateDirectChatResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ICreateDirectChatResponse>(ApiRoute.route + this.chatsRoute + userId,
      {}, header);
  }

  createGroup(request: CreateGroupCommand): Observable<ICreateGroupResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ICreateGroupResponse>(ApiRoute.route + this.chatsRoute, request, header);
  }

  searchChat(displayName: string): Observable<IGetUserChatsResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.route + this.chatsRoute + displayName, header);
  }
}
