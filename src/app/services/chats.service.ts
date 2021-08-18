import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domain, ChatsRoutes, UserChats} from "../../consts/Routes";
import {SessionService} from "./session.service";
import {IChatsService} from "../../types/interfaces/IChatsService";
import {IGetUserChatsResponse} from "../../types/responses/IGetUserChatsResponse";
import {ICreateDirectChatResponse} from "../../types/responses/ICreateDirectChatResponse";
import {ICreateGroupResponse} from "../../types/responses/ICreateGroupResponse";
import {CreateGroupCommand} from "../../types/requests/CreateGroupCommand";
import {IJoinGroupResponse} from "../../types/responses/IJoinGroupResponse";

@Injectable({
  providedIn: 'root'
})
export class ChatsService implements IChatsService {

  constructor(private httpClient: HttpClient, private authService: SessionService) {
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserChatsResponse>(Domain.route + ChatsRoutes.route, header);
  }

  createDirectChat(userId: string): Observable<ICreateDirectChatResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ICreateDirectChatResponse>(Domain.route + ChatsRoutes.route + '/' + userId,
      {}, header);
  }

  createGroup(request: CreateGroupCommand): Observable<ICreateGroupResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ICreateGroupResponse>(Domain.route + ChatsRoutes.route, request, header);
  }

  joinGroup(groupId: number): Observable<IJoinGroupResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<IJoinGroupResponse>(Domain.route + UserChats.route + '/' + groupId, {}, header);
  }
}
