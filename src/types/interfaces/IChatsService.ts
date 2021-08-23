import {Observable} from "rxjs";
import {IGetUserChatsResponse} from "../responses/IGetUserChatsResponse";
import {CreateGroupCommand} from "../requests/CreateGroupCommand";
import {ICreateChatResponse} from "../responses/ICreateChatResponse";

export interface IChatsService {
  getUserChats(): Observable<IGetUserChatsResponse>;

  createGroup(request: CreateGroupCommand): Observable<ICreateChatResponse>;

  createDirectChat(userId: string): Observable<ICreateChatResponse>;

  searchChat(displayName: string): Observable<IGetUserChatsResponse>;
}
