import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domain, ChatsRoutes, UserChats} from "../../consts/Routes";
import {IGetUserChatsResponse} from "../../types/Chats/Responses/IGetUserChatsResponse";
import {IChatsService} from "../../types/ServiceInterfaces/IChatsService";
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

    return this.httpClient.get<IGetUserChatsResponse>(Domain.route + ChatsRoutes.route, header);
  }

  createDirectChat(userId: string): Observable<ICreateDirectChatResponse> {
    let accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ICreateDirectChatResponse>(Domain.route + ChatsRoutes.route + '/' + userId,
      {}, header);
  }

  createGroup(request: CreateGroupCommand): Observable<ICreateGroupResponse> {
    let accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ICreateGroupResponse>(Domain.route + ChatsRoutes.route, request, header);
  }

  joinGroup(groupId: number): Observable<IJoinGroupResponse> {
    let accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<IJoinGroupResponse>(Domain.route + UserChats.route + '/' + groupId, {}, header);
  }
}
