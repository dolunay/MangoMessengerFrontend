import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiRoute} from "../../consts/Routes";
import {IUserService} from "../../types/interfaces/IUserService";
import {IGetUserResponse} from "../../types/responses/IGetUserResponse";
import {RegisterCommand} from "../../types/requests/RegisterCommand";
import {IRegisterResponse} from "../../types/responses/IRegisterResponse";
import {IVerifyEmailResponse} from "../../types/responses/IVerifyEmailResponse";
import {VerifyEmailCommand} from "../../types/requests/VerifyEmailCommand";
import {IVerifyPhoneCodeResponse} from "../../types/responses/IVerifyPhoneCodeResponse";
import {ISearchResponse} from "../../types/responses/ISearchResponse";
import {UpdateUserInformationCommand} from "../../types/requests/UpdateUserInformationCommand";
import {IUpdateUserInformationResponse} from "../../types/responses/IUpdateUserInformationResponse";

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

  postUser(command: RegisterCommand): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(ApiRoute.route + this.usersRoute, command);
  }

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IVerifyEmailResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IVerifyEmailResponse>(ApiRoute.route + this.usersRoute + 'email-confirmation/',
      request, header);
  }

  putPhoneConfirmation(phoneCode: number): Observable<IVerifyPhoneCodeResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IVerifyPhoneCodeResponse>(ApiRoute.route + this.usersRoute + phoneCode,
      {}, header);
  }

  postSearch(displayName: string): Observable<ISearchResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.post<ISearchResponse>(ApiRoute.route + this.usersRoute + displayName, {}, header);
  }

  putUpdateUserInformation(request: UpdateUserInformationCommand): Observable<IUpdateUserInformationResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<ISearchResponse>(ApiRoute.route + this.usersRoute + 'information/', request, header);
  }
}
