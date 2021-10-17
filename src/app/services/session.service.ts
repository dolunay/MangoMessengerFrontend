import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tokens} from "../../consts/Tokens";
import {LoginCommand} from "../../types/requests/LoginCommand";
import {ITokensResponse} from "../../types/responses/ITokensResponse";
import {ApiRoute} from "../../consts/ApiRoute";
import {IBaseResponse} from "../../types/responses/IBaseResponse";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionsRoute = 'api/sessions/'

  constructor(private httpClient: HttpClient) {
  }

  // POST /api/sessions
  createSession(command: LoginCommand): Observable<ITokensResponse> {
    return this.httpClient.post<ITokensResponse>(ApiRoute.route + this.sessionsRoute, command,
      {withCredentials: true});
  }

  // POST /api/sessions/{refreshToken}
  refreshSession(refreshToken: string | null): Observable<ITokensResponse> {
    return this.httpClient.post<ITokensResponse>(ApiRoute.route + this.sessionsRoute + refreshToken, {});
  }

  // DELETE /api/sessions/{refreshToken}
  deleteSession(refreshToken: string | null): Observable<IBaseResponse> {
    return this.httpClient.delete<IBaseResponse>(ApiRoute.route + this.sessionsRoute + refreshToken);
  }

  // DELETE /api/sessions
  deleteAllSessions(): Observable<IBaseResponse> {
    return this.httpClient.delete<IBaseResponse>(ApiRoute.route + this.sessionsRoute);
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

  clearAccessToken(): void {
    localStorage.removeItem(Tokens.accessToken);
  }

  clearRefreshToken(): void {
    localStorage.removeItem(Tokens.refreshToken);
  }

  getUserId(): string | null {
    return localStorage.getItem('MangoUserID');
  }

  writeUserId(userId: string): void {
    localStorage.setItem(Tokens.userId, userId);
  }

  clearUserId(): void {
    localStorage.removeItem(Tokens.userId);
  }
}
