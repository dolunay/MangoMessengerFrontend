import {Observable} from "rxjs";
import {IGetUserResponse} from "../responses/IGetUserResponse";

export interface IUserService {
  getUserById(userId: string): Observable<IGetUserResponse>;

  getCurrentUser(): Observable<IGetUserResponse>;
}
