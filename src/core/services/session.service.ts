import { Injectable } from '@angular/core';
import type { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { LoginCommand } from '@shared/types/requests';
import type { IBaseResponse, ITokensResponse } from '@shared/types/responses';
import type { ITokens } from '@shared/types/models';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SessionService {
	private sessionsRoute = 'api/sessions/';
	private readonly LocalStorageTokenKey = 'MANGO_TOKEN';

	constructor(private httpClient: HttpClient) {}

	// POST /api/sessions
	createSession(command: LoginCommand): Observable<ITokensResponse> {
		return this.httpClient.post<ITokensResponse>(environment.baseUrl + this.sessionsRoute, command, {
			withCredentials: true,
		});
	}

	// POST /api/sessions/{refreshToken}
	refreshSession(refreshToken: string | null): Observable<ITokensResponse> {
		return this.httpClient.post<ITokensResponse>(environment.baseUrl + this.sessionsRoute + refreshToken, {});
	}

	// DELETE /api/sessions/{refreshToken}
	deleteSession(refreshToken: string | null): Observable<IBaseResponse> {
		return this.httpClient.delete<IBaseResponse>(environment.baseUrl + this.sessionsRoute + refreshToken);
	}

	// DELETE /api/sessions
	deleteAllSessions(): Observable<IBaseResponse> {
		return this.httpClient.delete<IBaseResponse>(environment.baseUrl + this.sessionsRoute);
	}

	getTokens(): ITokens | null {
		const tokensString = localStorage.getItem(this.LocalStorageTokenKey);

		return tokensString === null ? null : JSON.parse(tokensString);
	}

	setTokens(tokens: ITokens): void {
		const tokensStringify = JSON.stringify(tokens);
		localStorage.setItem(this.LocalStorageTokenKey, tokensStringify);
	}

	clearTokens(): void {
		localStorage.removeItem(this.LocalStorageTokenKey);
	}
}
