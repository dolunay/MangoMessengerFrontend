import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  // @ts-ignore
  logout(request: LogoutCommand): Observable<ILogoutResponse> {
  }

  logoutAll(request: LogoutAllCommand): Observable<ILogoutResponse> {
    // @ts-ignore
    return undefined;
  }

  verifyEmail(email: string, userId: string): Observable<IVerifyEmailResponse> {
    // @ts-ignore
    return undefined;
  }
}