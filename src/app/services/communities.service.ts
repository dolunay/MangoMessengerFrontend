import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGetUserChatsResponse} from "../../types/responses/IGetUserChatsResponse";
import {ICreateCommunityResponse} from "../../types/responses/ICreateCommunityResponse";
import {CreateChannelCommand} from "../../types/requests/CreateChannelCommand";
import {CreateChatCommand} from "../../types/requests/CreateChatCommand";
import {UpdateChatLogoCommand} from "../../types/requests/UpdateChatLogoCommand";
import {IBaseResponse} from "../../types/responses/IBaseResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  private chatsRoute = 'api/communities/'

  constructor(private httpClient: HttpClient) {
  }

  // GET /api/communities
  getUserChats(): Observable<IGetUserChatsResponse> {
    return this.httpClient.get<IGetUserChatsResponse>(environment.baseUrl + this.chatsRoute);
  }

  // POST /api/communities/chat
  createChat(request: CreateChatCommand): Observable<ICreateCommunityResponse> {
    return this.httpClient.post<ICreateCommunityResponse>(environment.baseUrl + this.chatsRoute + 'chat', request);
  }

  // POST /api/communities/channel
  createChannel(request: CreateChannelCommand): Observable<ICreateCommunityResponse> {
    return this.httpClient.post<ICreateCommunityResponse>(environment.baseUrl + this.chatsRoute + 'channel', request);
  }

  // GET /api/communities/searches
  searchChat(displayName: string): Observable<IGetUserChatsResponse> {
    return this.httpClient.get<IGetUserChatsResponse>(environment.baseUrl + this.chatsRoute + 'searches?displayName='
      + displayName);
  }

  // PUT /api/communities/picture
  updateChatLogo(command: UpdateChatLogoCommand): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(environment.baseUrl + this.chatsRoute + 'picture', command);
  }
}
