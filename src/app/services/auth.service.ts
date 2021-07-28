import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterCommand} from "../../types/Auth/Requests/RegisterCommand";
import {Observable} from "rxjs";
import {IRegisterResponse} from "../../types/Auth/Responses/IRegisterResponse";
import {ApiRoute, AuthRoutes} from "../../consts/Routes";
import {VerifyPhoneCommand} from "../../types/Auth/Requests/VerifyPhoneCommand";
import {IVerifyPhoneCodeResponse} from "../../types/Auth/Responses/IVerifyPhoneCodeResponse";
import {LoginCommand} from "../../types/Auth/Requests/LoginCommand";
import {ILoginResponse} from "../../types/Auth/Responses/ILoginResponse";
import {RefreshTokenCommand} from "../../types/Auth/Requests/RefreshTokenCommand";
import {IRefreshTokenResponse} from "../../types/Auth/Responses/IRefreshTokenResponse";
import {IAuthService} from "../../types/ServiceInterfaces/IAuthService";
import {LogoutCommand} from "../../types/Auth/Requests/LogoutCommand";
import {ILogoutResponse} from "../../types/Auth/Responses/ILogoutResponse";
import {LogoutAllCommand} from "../../types/Auth/Requests/LogoutAllCommand";
import {IVerifyEmailResponse} from "../../types/Auth/Responses/IVerifyEmailResponse";
import {Tokens} from "../../consts/Tokens";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  constructor(private httpClient: HttpClient) {
  }

  register(command: RegisterCommand): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(ApiRoute.apiDomain + AuthRoutes.postRegister, command);
  }

  verifyPhone(command: VerifyPhoneCommand): Observable<IVerifyPhoneCodeResponse> {
    return this.httpClient.post<IVerifyPhoneCodeResponse>(ApiRoute.apiDomain + AuthRoutes.getVerifyPhone, command);
  }

  login(command: LoginCommand): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(ApiRoute.apiDomain + AuthRoutes.postLogin, command,
      {withCredentials: true});
  }

  refreshToken(request: RefreshTokenCommand): Observable<IRefreshTokenResponse> {
    return this.httpClient.post<IRefreshTokenResponse>(ApiRoute.apiDomain + AuthRoutes.postRefreshToken, request);
  }

  logout(request: LogoutCommand): Observable<ILogoutResponse> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.getAccessToken()}`)
    };

    return this.httpClient.post<ILogoutResponse>(ApiRoute.apiDomain + AuthRoutes.postLogout, request, header);
  }

  logoutAll(request: LogoutAllCommand): Observable<ILogoutResponse> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.getAccessToken()}`)
    };

    return this.httpClient.post<ILogoutResponse>(ApiRoute.apiDomain + AuthRoutes.postLogoutAll, request, header);
  }

  verifyEmail(email: string, userId: string): Observable<IVerifyEmailResponse> {
    // @ts-ignore
    return undefined;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(Tokens.accessToken);
  }

  getRefreshTokenId(): string | null {
    return localStorage.getItem(Tokens.refreshTokenId);
  }

  writeAccessToken(token: string): void {
    localStorage.setItem(Tokens.accessToken, token);
  }

  writeRefreshTokenId(tokenId: string): void {
    localStorage.setItem(Tokens.refreshTokenId, tokenId);
  }
}
