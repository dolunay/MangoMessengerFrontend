import {Observable} from "rxjs";
import {IGetContactsResponse} from "../responses/IGetContactsResponse";
import {IBaseResponse} from "../responses/IBaseResponse";

export interface IContactsService {
  getContacts(): Observable<IGetContactsResponse>;

  postAddContact(userId: string): Observable<IBaseResponse>;

  deleteContact(userId: string): Observable<IBaseResponse>;
}
