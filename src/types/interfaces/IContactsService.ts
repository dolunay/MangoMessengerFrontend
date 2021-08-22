import {Observable} from "rxjs";
import {IGetContactsResponse} from "../responses/IGetContactsResponse";
import {IAddContactResponse} from "../responses/IAddContactResponse";

export interface IContactsService {
  getContacts(): Observable<IGetContactsResponse>;

  postAddContact(userId: string): Observable<IAddContactResponse>;
}
