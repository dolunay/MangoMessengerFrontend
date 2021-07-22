import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiRoute, ChatsRoutes} from "../../consts/Routes";
import {IGetUserChatsResponse} from "../../types/Chats/Responses/IGetUserChatsResponse";
import {Tokens} from "../../consts/Tokens";
import {IChatsService} from "../../types/ServiceInterfaces/IChatsService";
import {CreateDirectChatCommand} from "../../types/Chats/Requests/CreateDirectChatCommand";
import {ICreateDirectChatResponse} from "../../types/Chats/Responses/ICreateDirectChatResponse";
import {CreateGroupCommand} from "../../types/Chats/Requests/CreateGroupCommand";
import {ICreateGroupResponse} from "../../types/Chats/Responses/ICreateGroupResponse";
import {IJoinGroupResponse} from "../../types/Chats/Responses/IJoinGroupResponse";

@Injectable({
  providedIn: 'root'
})
export class ChatsService implements IChatsService {

  constructor(private httpClient: HttpClient) {
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem(Tokens.accessToken)}`)
    };

    return this.httpClient.get<IGetUserChatsResponse>(ApiRoute.apiDomain + ChatsRoutes.getChats, header);
  }

  createDirectChat(request: CreateDirectChatCommand): Observable<ICreateDirectChatResponse> {
    // @ts-ignore
    return undefined;
  }

  createGroup(request: CreateGroupCommand): Observable<ICreateGroupResponse> {
    // @ts-ignore
    return undefined;
  }

  joinGroup(groupId: number): Observable<IJoinGroupResponse> {
    // @ts-ignore
    return undefined;
  }
}
