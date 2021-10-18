import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IGetContactsResponse} from "../../types/responses/IGetContactsResponse";
import {HttpClient} from "@angular/common/http";
import {ApiRoute} from "../../consts/ApiRoute";
import {IBaseResponse} from "../../types/responses/IBaseResponse";
import {ISearchContactsResponse} from "../../types/responses/ISearchContactsResponse";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactsRoute = 'api/contacts/'

  constructor(private httpClient: HttpClient) {
  }

  // GET /api/contacts
  getCurrentUserContacts(): Observable<IGetContactsResponse> {
    return this.httpClient.get<IGetContactsResponse>(ApiRoute.route + this.contactsRoute);
  }

  // POST /api/contacts/{contactId}
  addContact(userId: string): Observable<IBaseResponse> {
    return this.httpClient.post<IGetContactsResponse>(ApiRoute.route + this.contactsRoute + userId, {});
  }

  // DELETE /api/contacts/{contactId}
  deleteContact(userId: string): Observable<IBaseResponse> {
    return this.httpClient.delete<IGetContactsResponse>(ApiRoute.route + this.contactsRoute + userId);
  }

  // GET /api/contacts/searches
  searchContacts(displayName: string): Observable<ISearchContactsResponse> {
    return this.httpClient.get<ISearchContactsResponse>(ApiRoute.route + this.contactsRoute +
      'searches?searchQuery=' + displayName);
  }
}
