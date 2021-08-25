import {Observable} from "rxjs";
import {LoginCommand} from "../requests/LoginCommand";
import {ITokensResponse} from "../responses/ITokensResponse";
import {IBaseResponse} from "../responses/IBaseResponse";

export interface ISessionService {

  postSession(command: LoginCommand): Observable<ITokensResponse>;

  postRefreshSession(refreshToken: string | null): Observable<ITokensResponse>;

  deleteSession(refreshToken: string | null): Observable<IBaseResponse>;

  deleteAllSessions(refreshToken: string | null): Observable<IBaseResponse>;

  getRefreshToken(): string | null;

  getAccessToken(): string | null;

  writeAccessToken(token: string): void;

  writeRefreshToken(tokenId: string): void;

  writeActiveChatId(chatId: string): void;

  getActiveChatId(): string | null;
}
