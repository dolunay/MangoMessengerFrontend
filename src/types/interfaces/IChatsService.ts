import {Observable} from "rxjs";
import {IGetUserChatsResponse} from "../responses/IGetUserChatsResponse";
import {CreateGroupCommand} from "../requests/CreateGroupCommand";
import {ICreateGroupResponse} from "../responses/ICreateGroupResponse";
import {ICreateDirectChatResponse} from "../responses/ICreateDirectChatResponse";
import {IJoinGroupResponse} from "../responses/IJoinGroupResponse";

export interface IChatsService {
  getUserChats(): Observable<IGetUserChatsResponse>;

  createGroup(request: CreateGroupCommand): Observable<ICreateGroupResponse>;

  createDirectChat(userId: string): Observable<ICreateDirectChatResponse>;

  joinGroup(groupId: number): Observable<IJoinGroupResponse>;

  searchChat(displayName: string): Observable<IGetUserChatsResponse>;
}
