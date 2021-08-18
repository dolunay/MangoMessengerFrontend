import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Domain, SessionRoutes, UserRoutes} from "../../consts/Routes";
import {IUserService} from "../../types/interfaces/IUserService";
import {IGetUserResponse} from "../../types/responses/IGetUserResponse";
import {RegisterCommand} from "../../types/requests/RegisterCommand";
import {IRegisterResponse} from "../../types/responses/IRegisterResponse";
import {IVerifyEmailResponse} from "../../types/responses/IVerifyEmailResponse";
import {VerifyEmailCommand} from "../../types/requests/VerifyEmailCommand";
import {IVerifyPhoneCodeResponse} from "../../types/responses/IVerifyPhoneCodeResponse";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUserService {

  constructor(private authService: SessionService, private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<IGetUserResponse> {
    const accessToken = this.authService.getAccessToken();
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserResponse>(Domain.route + UserRoutes.route, header);
  }

  getUserById(userId: string): Observable<IGetUserResponse> {
    const accessToken = this.authService.getAccessToken();
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserResponse>(Domain.route + UserRoutes.route + userId, header);
  }

  postUser(command: RegisterCommand): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(Domain.route + SessionRoutes.route, command);
  }

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IVerifyEmailResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IVerifyEmailResponse>(Domain.route + UserRoutes.route + 'email-confirmation/',
      request, header);
  }

  putPhoneConfirmation(phoneCode: number): Observable<IVerifyPhoneCodeResponse> {
    const accessToken = this.authService.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IVerifyPhoneCodeResponse>(Domain.route + UserRoutes.route + 'phone-confirmation/' +
      phoneCode, {}, header);
  }
}
