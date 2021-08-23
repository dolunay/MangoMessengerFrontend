import {Observable} from "rxjs";
import {IGetContactsResponse} from "../responses/IGetContactsResponse";
import {IAddContactResponse} from "../responses/IAddContactResponse";
import {IDeleteContactResponse} from "../responses/IDeleteContactResponse";

export interface IContactsService {
  getContacts(): Observable<IGetContactsResponse>;

  postAddContact(userId: string): Observable<IAddContactResponse>;

  deleteContact(userId: string): Observable<IDeleteContactResponse>;
}
