import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domain, SessionRoutes, UserRoutes} from "../../consts/Routes";
import {Tokens} from "../../consts/Tokens";
import {IAuthService} from "../../types/interfaces/IAuthService";
import {RegisterCommand} from "../../types/requests/RegisterCommand";
import {IRegisterResponse} from "../../types/responses/IRegisterResponse";
import {IVerifyPhoneCodeResponse} from "../../types/responses/IVerifyPhoneCodeResponse";
import {ILoginResponse} from "../../types/responses/ILoginResponse";
import {LoginCommand} from "../../types/requests/LoginCommand";
import {IRefreshTokenResponse} from "../../types/responses/IRefreshTokenResponse";
import {ILogoutResponse} from "../../types/responses/ILogoutResponse";
import {IVerifyEmailResponse} from "../../types/responses/IVerifyEmailResponse";
import {VerifyEmailCommand} from "../../types/requests/VerifyEmailCommand";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  constructor(private httpClient: HttpClient) {
  }

  postUser(command: RegisterCommand): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(Domain.route + SessionRoutes.route, command);
  }

  putPhoneConfirmation(phoneCode: number): Observable<IVerifyPhoneCodeResponse> {
    const accessToken = this.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IVerifyPhoneCodeResponse>(Domain.route + UserRoutes.route + 'phone-confirmation/' +
      phoneCode, {}, header);
  }

  postSession(command: LoginCommand): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(Domain.route + SessionRoutes.route, command,
      {withCredentials: true});
  }

  postRefreshSession(refreshToken: string | null): Observable<IRefreshTokenResponse> {
    return this.httpClient.post<IRefreshTokenResponse>(Domain.route + SessionRoutes.route + '/' + refreshToken, {});
  }

  deleteSession(refreshToken: string | null): Observable<ILogoutResponse> {
    const accessToken = this.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.delete<ILogoutResponse>(Domain.route + SessionRoutes.route + '/' + refreshToken, header);
  }

  deleteAllSessions(refreshToken: string | null): Observable<ILogoutResponse> {
    const accessToken = this.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.delete<ILogoutResponse>(Domain.route + SessionRoutes.route, header);
  }

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IVerifyEmailResponse> {
    const accessToken = this.getAccessToken();

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.put<IVerifyEmailResponse>(Domain.route + UserRoutes.route + 'email-confirmation/',
      request, header);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(Tokens.accessToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(Tokens.refreshToken);
  }

  writeAccessToken(token: string): void {
    localStorage.setItem(Tokens.accessToken, token);
  }

  writeRefreshToken(tokenId: string): void {
    localStorage.setItem(Tokens.refreshToken, tokenId);
  }

  getHeader(): HttpHeaders {
    const accessToken = this.getAccessToken();
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }
}
