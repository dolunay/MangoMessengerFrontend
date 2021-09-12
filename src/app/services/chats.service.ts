import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICommunityService} from "../../types/interfaces/ICommunityService";
import {IGetUserChatsResponse} from "../../types/responses/IGetUserChatsResponse";
import {ICreateCommunityResponse} from "../../types/responses/ICreateCommunityResponse";
import {CreateChannelCommand} from "../../types/requests/CreateChannelCommand";
import {ApiRoute} from "../../consts/ApiRoute";
import {IGetChatByIdResponse} from "../../types/responses/IGetChatByIdResponse";
import {CreateChatCommand} from "../../types/requests/CreateChatCommand";
import {IGetSecretChatPublicKeyResponse} from "../../types/responses/IGetSecretChatPublicKeyResponse";

@Injectable({
  providedIn: 'root'
})
export class ChatsService implements ICommunityService {
  private chatsRoute = 'api/communities/'

  constructor(private httpClient: HttpClient) {
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.route + this.chatsRoute);
  }

  createChat(request: CreateChatCommand): Observable<ICreateCommunityResponse> {
    return this.httpClient.post<ICreateCommunityResponse>(ApiRoute.route + this.chatsRoute + 'chat', request);
  }

  createChannel(request: CreateChannelCommand): Observable<ICreateCommunityResponse> {
    return this.httpClient.post<ICreateCommunityResponse>(ApiRoute.route + this.chatsRoute + 'channel', request);
  }

  searchChat(displayName: string): Observable<IGetUserChatsResponse> {
    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.route + this.chatsRoute + 'searches?displayName=' + displayName);
  }

  getChatById(chatId: string): Observable<IGetChatByIdResponse> {
    return this.httpClient.get<IGetChatByIdResponse>(ApiRoute.route + this.chatsRoute + chatId);
  }

  getSecretChatPublicKey(chatId: string): Observable<IGetSecretChatPublicKeyResponse> {
    return this.httpClient.get<IGetSecretChatPublicKeyResponse>(ApiRoute.route + this.chatsRoute + 'chats/public-key/'
      + chatId);
  }
}
