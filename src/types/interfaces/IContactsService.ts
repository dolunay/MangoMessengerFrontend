import {Observable} from "rxjs";
import {IGetContactsResponse} from "../responses/IGetContactsResponse";
import {IBaseResponse} from "../responses/IBaseResponse";
import {ISearchContactsResponse} from "../responses/ISearchContactsResponse";

export interface IContactsService {
  getCurrentUserContacts(): Observable<IGetContactsResponse>;

  postAddContact(userId: string): Observable<IBaseResponse>;

  deleteContact(userId: string): Observable<IBaseResponse>;

  searchContacts(displayName: string): Observable<ISearchContactsResponse>;
}
