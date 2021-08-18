import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {ILoginResponse} from "../responses/ILoginResponse";
import {LoginCommand} from "../requests/LoginCommand";
import {IRefreshTokenResponse} from "../responses/IRefreshTokenResponse";
import {ILogoutResponse} from "../responses/ILogoutResponse";

export interface ISessionService {

  postSession(command: LoginCommand): Observable<ILoginResponse>;

  postRefreshSession(refreshToken: string | null): Observable<IRefreshTokenResponse>;

  deleteSession(refreshToken: string | null): Observable<ILogoutResponse>;

  deleteAllSessions(refreshToken: string | null): Observable<ILogoutResponse>;

  getRefreshToken(): string | null;

  getAccessToken(): string | null;

  writeAccessToken(token: string): void;

  writeRefreshToken(tokenId: string): void;

  getHeader(): HttpHeaders;
}
