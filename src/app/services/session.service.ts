import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domain, SessionRoutes} from "../../consts/Routes";
import {Tokens} from "../../consts/Tokens";
import {ISessionService} from "../../types/interfaces/ISessionService";
import {ILoginResponse} from "../../types/responses/ILoginResponse";
import {LoginCommand} from "../../types/requests/LoginCommand";
import {IRefreshTokenResponse} from "../../types/responses/IRefreshTokenResponse";
import {ILogoutResponse} from "../../types/responses/ILogoutResponse";

@Injectable({
  providedIn: 'root'
})
export class SessionService implements ISessionService {

  constructor(private httpClient: HttpClient) {
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
