import {Observable} from "rxjs";
import {IGetUserResponse} from "../Users/Responses/IGetUserResponse";

export interface IUserService {
  getUserById(userId: string): Observable<IGetUserResponse>;
  getCurrentUser() : Observable<IGetUserResponse>;
}
