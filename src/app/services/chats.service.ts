import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domain, ChatsRoutes} from "../../consts/Routes";
import {IGetUserChatsResponse} from "../../types/Chats/Responses/IGetUserChatsResponse";
import {IChatsService} from "../../types/ServiceInterfaces/IChatsService";
import {CreateDirectChatCommand} from "../../types/Chats/Requests/CreateDirectChatCommand";
import {ICreateDirectChatResponse} from "../../types/Chats/Responses/ICreateDirectChatResponse";
import {CreateGroupCommand} from "../../types/Chats/Requests/CreateGroupCommand";
import {ICreateGroupResponse} from "../../types/Chats/Responses/ICreateGroupResponse";
import {IJoinGroupResponse} from "../../types/Chats/Responses/IJoinGroupResponse";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatsService implements IChatsService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    let accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserChatsResponse>(Domain.route + ChatsRoutes.getChats, header);
  }

  createDirectChat(request: CreateDirectChatCommand): Observable<ICreateDirectChatResponse> {
    // @ts-ignore
    return undefined;
  }

  createGroup(request: CreateGroupCommand): Observable<ICreateGroupResponse> {
    let accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ICreateGroupResponse>(Domain.route + ChatsRoutes.postGroup, request, header);
  }

  joinGroup(groupId: number): Observable<IJoinGroupResponse> {
    // @ts-ignore
    return undefined;
  }
}
