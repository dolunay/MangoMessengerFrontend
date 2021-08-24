import {Injectable} from '@angular/core';
import {IContactsService} from "../../types/interfaces/IContactsService";
import {Observable} from "rxjs";
import {IGetContactsResponse} from "../../types/responses/IGetContactsResponse";
import {HttpClient} from "@angular/common/http";
import {ApiRoute} from "../../consts/ApiRoute";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements IContactsService {
  private contactsRoute = 'api/contacts/'

  constructor(private httpClient: HttpClient) {
  }

  getContacts(): Observable<IGetContactsResponse> {
    return this.httpClient.get<IGetContactsResponse>(ApiRoute.route + this.contactsRoute);
  }

  postAddContact(userId: string): Observable<IBaseResponse> {
    return this.httpClient.post<IGetContactsResponse>(ApiRoute.route + this.contactsRoute + userId, {});
  }

  deleteContact(userId: string): Observable<IBaseResponse> {
    return this.httpClient.delete<IGetContactsResponse>(ApiRoute.route + this.contactsRoute + userId);
  }
}
