import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { IBaseResponse } from '@shared/types/responses';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserChatsService {
	private userChatsRoute = 'api/user-chats/';
	private httpClient = inject(HttpClient);

	// POST /api/user-chats/{chatId}
	joinCommunity(chatId: string): Observable<IBaseResponse> {
		return this.httpClient.post<IBaseResponse>(environment.baseUrl + this.userChatsRoute + chatId, {});
	}

	// PUT /api/user-chats/{chatId}
	archiveCommunity(chatId: string): Observable<IBaseResponse> {
		return this.httpClient.put<IBaseResponse>(environment.baseUrl + this.userChatsRoute + chatId, {});
	}

	// DELETE /api/user-chats/{chatId}
	leaveCommunity(chatId: string): Observable<IBaseResponse> {
		return this.httpClient.delete<IBaseResponse>(environment.baseUrl + this.userChatsRoute + chatId);
	}
}
