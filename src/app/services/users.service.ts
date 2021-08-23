import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUserService} from "../../types/interfaces/IUserService";
import {IGetUserResponse} from "../../types/responses/IGetUserResponse";
import {RegisterCommand} from "../../types/requests/RegisterCommand";
import {VerifyEmailCommand} from "../../types/requests/VerifyEmailCommand";
import {ISearchResponse} from "../../types/responses/ISearchResponse";
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

  constructor(private authService: SessionService, private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<IGetUserResponse> {
    const accessToken = this.authService.getAccessToken();
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserResponse>(ApiRoute.route + this.usersRoute, header);
  }

  getUserById(userId: string): Observable<IGetUserResponse> {
    const accessToken = this.authService.getAccessToken();
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserResponse>(ApiRoute.route + this.usersRoute + userId, header);
  }

  postUser(command: RegisterCommand): Observable<ITokensResponse> {
    return this.httpClient.post<ITokensResponse>(ApiRoute.route + this.usersRoute, command);
  }

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IBaseResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.usersRoute + 'email-confirmation/',
      request, header);
  }

  putPhoneConfirmation(phoneCode: number): Observable<IBaseResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.usersRoute + phoneCode,
      {}, header);
  }

  postSearch(displayName: string): Observable<ISearchResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ISearchResponse>(ApiRoute.route + this.usersRoute + displayName, {}, header);
  }

  putUpdateUserInformation(request: UpdateUserInformationCommand): Observable<IBaseResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<ISearchResponse>(ApiRoute.route + this.usersRoute + 'information/', request, header);
  }

  putChangePassword(request: ChangePasswordCommand): Observable<IBaseResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.usersRoute + 'password/', request, header);
  }
}
