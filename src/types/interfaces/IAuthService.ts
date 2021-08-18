import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {IRegisterResponse} from "../responses/IRegisterResponse";
import {RegisterCommand} from "../requests/RegisterCommand";
import {IVerifyPhoneCodeResponse} from "../responses/IVerifyPhoneCodeResponse";
import {ILoginResponse} from "../responses/ILoginResponse";
import {LoginCommand} from "../requests/LoginCommand";
import {IRefreshTokenResponse} from "../responses/IRefreshTokenResponse";
import {VerifyEmailCommand} from "../requests/VerifyEmailCommand";
import {IVerifyEmailResponse} from "../responses/IVerifyEmailResponse";
import {ILogoutResponse} from "../responses/ILogoutResponse";

export interface IAuthService {
  postUser(command: RegisterCommand): Observable<IRegisterResponse>;

  putPhoneConfirmation(phoneCode: number): Observable<IVerifyPhoneCodeResponse>;

  postSession(command: LoginCommand): Observable<ILoginResponse>;

  postRefreshSession(refreshToken: string | null): Observable<IRefreshTokenResponse>;

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IVerifyEmailResponse>;

  deleteSession(refreshToken: string | null): Observable<ILogoutResponse>;

  deleteAllSessions(refreshToken: string | null): Observable<ILogoutResponse>;

  getRefreshToken(): string | null;

  getAccessToken(): string | null;

  writeAccessToken(token: string): void;

  writeRefreshToken(tokenId: string): void;

  getHeader(): HttpHeaders;
}
