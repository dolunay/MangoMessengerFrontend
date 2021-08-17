import {RegisterCommand} from "../Auth/Requests/RegisterCommand";
import {Observable} from "rxjs";
import {IRegisterResponse} from "../Auth/Responses/IRegisterResponse";
import {VerifyPhoneCommand} from "../Auth/Requests/VerifyPhoneCommand";
import {IVerifyPhoneCodeResponse} from "../Auth/Responses/IVerifyPhoneCodeResponse";
import {LoginCommand} from "../Auth/Requests/LoginCommand";
import {ILoginResponse} from "../Auth/Responses/ILoginResponse";
import {IRefreshTokenResponse} from "../Auth/Responses/IRefreshTokenResponse";
import {IVerifyEmailResponse} from "../Auth/Responses/IVerifyEmailResponse";
import {ILogoutResponse} from "../Auth/Responses/ILogoutResponse";
import {VerifyEmailCommand} from "../Auth/Requests/VerifyEmailCommand";

export interface IAuthService {
  postUser(command: RegisterCommand): Observable<IRegisterResponse>;

  putPhoneConfirmation(command: VerifyPhoneCommand): Observable<IVerifyPhoneCodeResponse>;

  postSession(command: LoginCommand): Observable<ILoginResponse>;

  postRefreshSession(refreshToken: string): Observable<IRefreshTokenResponse>;

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IVerifyEmailResponse>;

  deleteSession(refreshToken: string): Observable<ILogoutResponse>;

  deleteAllSessions(): Observable<ILogoutResponse>;

  getRefreshTokenId(): string | null;

  getAccessToken(): string | null;

  writeAccessToken(token: string): void;

  writeRefreshTokenId(tokenId: string): void;
}
