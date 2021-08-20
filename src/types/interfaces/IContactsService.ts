import {Observable} from "rxjs";
import {IGetContactsResponse} from "../responses/IGetContactsResponse";

export interface IContactsService {
  getContacts(): Observable<IGetContactsResponse>;
}
