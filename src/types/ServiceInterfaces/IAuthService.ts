import {RegisterCommand} from "../Auth/Requests/RegisterCommand";
import {Observable} from "rxjs";
import {IRegisterResponse} from "../Auth/Responses/IRegisterResponse";
import {VerifyPhoneCommand} from "../Auth/Requests/VerifyPhoneCommand";
import {IVerifyPhoneCodeResponse} from "../Auth/Responses/IVerifyPhoneCodeResponse";
import {LoginCommand} from "../Auth/Requests/LoginCommand";
import {ILoginResponse} from "../Auth/Responses/ILoginResponse";
import {RefreshTokenCommand} from "../Auth/Requests/RefreshTokenCommand";
import {IRefreshTokenResponse} from "../Auth/Responses/IRefreshTokenResponse";
import {IVerifyEmailResponse} from "../Auth/Responses/IVerifyEmailResponse";
import {LogoutCommand} from "../Auth/Requests/LogoutCommand";
import {ILogoutResponse} from "../Auth/Responses/ILogoutResponse";
import {LogoutAllCommand} from "../Auth/Requests/LogoutAllCommand";

export interface IAuthService {
  register(command: RegisterCommand): Observable<IRegisterResponse>;

  verifyPhone(command: VerifyPhoneCommand): Observable<IVerifyPhoneCodeResponse>;

  login(command: LoginCommand): Observable<ILoginResponse>;

  refreshToken(request: RefreshTokenCommand): Observable<IRefreshTokenResponse>;

  verifyEmail(email: string, userId: string): Observable<IVerifyEmailResponse>;

  logout(request: LogoutCommand): Observable<ILogoutResponse>;

  logoutAll(request: LogoutAllCommand): Observable<ILogoutResponse>;
}
