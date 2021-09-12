import {Observable} from "rxjs";
import {IGetUserChatsResponse} from "../responses/IGetUserChatsResponse";
import {CreateChannelCommand} from "../requests/CreateChannelCommand";
import {ICreateCommunityResponse} from "../responses/ICreateCommunityResponse";
import {IGetChatByIdResponse} from "../responses/IGetChatByIdResponse";
import {CreateChatCommand} from "../requests/CreateChatCommand";

export interface ICommunityService {
  getUserChats(): Observable<IGetUserChatsResponse>;

  createChannel(request: CreateChannelCommand): Observable<ICreateCommunityResponse>;

  createChat(request: CreateChatCommand): Observable<ICreateCommunityResponse>;

  searchChat(displayName: string): Observable<IGetUserChatsResponse>;

  getChatById(chatId: string): Observable<IGetChatByIdResponse>;
}
