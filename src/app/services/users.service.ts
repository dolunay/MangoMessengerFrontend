import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IUserService} from "../../types/interfaces/IUserService";
import {IGetUserResponse} from "../../types/responses/IGetUserResponse";
import {RegisterCommand} from "../../types/requests/RegisterCommand";
import {VerifyEmailCommand} from "../../types/requests/VerifyEmailCommand";
import {ISearchContactsResponse} from "../../types/responses/ISearchContactsResponse";
import {UpdateUserInformationCommand} from "../../types/requests/UpdateUserInformationCommand";
import {ChangePasswordCommand} from "../../types/requests/ChangePasswordCommand";
import {ApiRoute} from "../../consts/ApiRoute";
import {ITokensResponse} from "../../types/responses/ITokensResponse";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUserService {
  private usersRoute = 'api/users/'

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<IGetUserResponse> {
    return this.httpClient.get<IGetUserResponse>(ApiRoute.route + this.usersRoute);
  }

  getUserById(userId: string): Observable<IGetUserResponse> {
    return this.httpClient.get<IGetUserResponse>(ApiRoute.route + this.usersRoute + userId);
  }

  postUser(command: RegisterCommand): Observable<ITokensResponse> {
    return this.httpClient.post<ITokensResponse>(ApiRoute.route + this.usersRoute, command);
  }

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.usersRoute + 'email-confirmation/',
      request);
  }

  putPhoneConfirmation(phoneCode: number): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.usersRoute + phoneCode, {});
  }

  putUpdateUserInformation(request: UpdateUserInformationCommand): Observable<IBaseResponse> {
    return this.httpClient.put<ISearchContactsResponse>(ApiRoute.route + this.usersRoute + 'information/', request);
  }

  putChangePassword(request: ChangePasswordCommand): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.usersRoute + 'password/', request);
  }
}
