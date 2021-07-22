import {Observable} from "rxjs";
import {IGetUserChatsResponse} from "../Chats/Responses/IGetUserChatsResponse";
import {CreateGroupCommand} from "../Chats/Requests/CreateGroupCommand";
import {ICreateGroupResponse} from "../Chats/Responses/ICreateGroupResponse";
import {CreateDirectChatCommand} from "../Chats/Requests/CreateDirectChatCommand";
import {ICreateDirectChatResponse} from "../Chats/Responses/ICreateDirectChatResponse";
import {IJoinGroupResponse} from "../Chats/Responses/IJoinGroupResponse";

export interface IChatsService {
  getUserChats(): Observable<IGetUserChatsResponse>;

  createGroup(request: CreateGroupCommand): Observable<ICreateGroupResponse>;

  createDirectChat(request: CreateDirectChatCommand) : Observable<ICreateDirectChatResponse>;

  joinGroup(groupId: number): Observable<IJoinGroupResponse>;
}
