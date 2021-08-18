import {RegisterCommand} from "../Auth/Requests/RegisterCommand";
import {Observable} from "rxjs";
import {IRegisterResponse} from "../Auth/Responses/IRegisterResponse";
import {IVerifyPhoneCodeResponse} from "../Auth/Responses/IVerifyPhoneCodeResponse";
import {LoginCommand} from "../Auth/Requests/LoginCommand";
import {ILoginResponse} from "../Auth/Responses/ILoginResponse";
import {IRefreshTokenResponse} from "../Auth/Responses/IRefreshTokenResponse";
import {IVerifyEmailResponse} from "../Auth/Responses/IVerifyEmailResponse";
import {ILogoutResponse} from "../Auth/Responses/ILogoutResponse";
import {VerifyEmailCommand} from "../Auth/Requests/VerifyEmailCommand";
import {HttpHeaders} from "@angular/common/http";

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
