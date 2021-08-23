import {Injectable} from '@angular/core';
import {IContactsService} from "../../types/interfaces/IContactsService";
import {Observable} from "rxjs";
import {IGetContactsResponse} from "../../types/responses/IGetContactsResponse";
import {SessionService} from "./session.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiRoute} from "../../consts/ApiRoute";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements IContactsService {
  private contactsRoute = 'api/contacts/'

  constructor(private sessionService: SessionService, private httpClient: HttpClient) {
  }

  getContacts(): Observable<IGetContactsResponse> {
    const accessToken = this.sessionService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetContactsResponse>(ApiRoute.route + this.contactsRoute, header);
  }

  postAddContact(userId: string): Observable<IBaseResponse> {
    const accessToken = this.sessionService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<IGetContactsResponse>(ApiRoute.route + this.contactsRoute + userId, {}, header);
  }

  deleteContact(userId: string): Observable<IBaseResponse> {
    const accessToken = this.sessionService.getAccessToken();

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.delete<IGetContactsResponse>(ApiRoute.route + this.contactsRoute + userId, header);
  }
}
