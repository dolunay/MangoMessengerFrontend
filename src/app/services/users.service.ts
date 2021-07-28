import {Injectable} from '@angular/core';
import {IUserService} from "../../types/ServiceInterfaces/IUserService";
import {Observable} from "rxjs";
import {IGetUserResponse} from "../../types/Users/Responses/IGetUserResponse";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUserService {

  constructor() {
  }

  getCurrentUser(): Observable<IGetUserResponse> {
    // @ts-ignore
    return undefined;
  }

  getUserById(userId: number): Observable<IGetUserResponse> {
    // @ts-ignore
    return undefined;
  }
}
