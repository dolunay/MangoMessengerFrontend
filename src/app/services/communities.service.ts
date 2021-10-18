import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGetUserChatsResponse} from "../../types/responses/IGetUserChatsResponse";
import {ICreateCommunityResponse} from "../../types/responses/ICreateCommunityResponse";
import {CreateChannelCommand} from "../../types/requests/CreateChannelCommand";
import {ApiRoute} from "../../consts/ApiRoute";
import {IGetChatByIdResponse} from "../../types/responses/IGetChatByIdResponse";
import {CreateChatCommand} from "../../types/requests/CreateChatCommand";
import {IGetSecretChatPublicKeyResponse} from "../../types/responses/IGetSecretChatPublicKeyResponse";
import {UpdateChatLogoCommand} from "../../types/requests/UpdateChatLogoCommand";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  private chatsRoute = 'api/communities/'

  constructor(private httpClient: HttpClient) {
  }

  // GET /api/communities
  getUserChats(): Observable<IGetUserChatsResponse> {
    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.route + this.chatsRoute);
  }

  // POST /api/communities/chat
  createChat(request: CreateChatCommand): Observable<ICreateCommunityResponse> {
    return this.httpClient.post<ICreateCommunityResponse>(ApiRoute.route + this.chatsRoute + 'chat', request);
  }

  // POST /api/communities/channel
  createChannel(request: CreateChannelCommand): Observable<ICreateCommunityResponse> {
    return this.httpClient.post<ICreateCommunityResponse>(ApiRoute.route + this.chatsRoute + 'channel', request);
  }

  // GET /api/communities/searches
  searchChat(displayName: string): Observable<IGetUserChatsResponse> {
    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.route + this.chatsRoute + 'searches?displayName='
      + displayName);
  }

  // GET /api/communities/{id}
  getChatById(chatId: string): Observable<IGetChatByIdResponse> {
    return this.httpClient.get<IGetChatByIdResponse>(ApiRoute.route + this.chatsRoute + chatId);
  }

  // GET /api/communities/chats/public-key/{chatId}
  getSecretChatPublicKey(chatId: string): Observable<IGetSecretChatPublicKeyResponse> {
    return this.httpClient.get<IGetSecretChatPublicKeyResponse>(ApiRoute.route + this.chatsRoute +
      'chats/public-key/' + chatId);
  }

  // PUT /api/communities/picture
  updateChatLogo(command: UpdateChatLogoCommand): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.chatsRoute + 'picture', command);
  }
}
