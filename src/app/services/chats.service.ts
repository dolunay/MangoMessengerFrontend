import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IChatsService} from "../../types/interfaces/IChatsService";
import {IGetUserChatsResponse} from "../../types/responses/IGetUserChatsResponse";
import {ICreateChatResponse} from "../../types/responses/ICreateChatResponse";
import {CreateGroupCommand} from "../../types/requests/CreateGroupCommand";
import {ApiRoute} from "../../consts/ApiRoute";

@Injectable({
  providedIn: 'root'
})
export class ChatsService implements IChatsService {
  private chatsRoute = 'api/chats/'

  constructor(private httpClient: HttpClient) {
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.route + this.chatsRoute);
  }

  createDirectChat(userId: string): Observable<ICreateChatResponse> {
    return this.httpClient.post<ICreateChatResponse>(ApiRoute.route + this.chatsRoute + userId, {});
  }

  createGroup(request: CreateGroupCommand): Observable<ICreateChatResponse> {
    return this.httpClient.post<ICreateChatResponse>(ApiRoute.route + this.chatsRoute, request);
  }

  searchChat(displayName: string): Observable<IGetUserChatsResponse> {
    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.route + this.chatsRoute + 'searches/' + displayName);
  }
}
