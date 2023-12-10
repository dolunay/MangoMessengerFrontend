import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { ICreateCommunityResponse, IGetUserChatsResponse, IUpdateChatLogoResponse } from '@shared/types/responses';

import type { CreateChannelCommand, CreateChatCommand } from '@shared/types/requests';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CommunitiesService {
	private chatsRoute = 'api/communities/';
	private httpClient = inject(HttpClient);

	// GET /api/communities
	getUserChats(): Observable<IGetUserChatsResponse> {
		return this.httpClient.get<IGetUserChatsResponse>(environment.baseUrl + this.chatsRoute);
	}

	// POST /api/communities/chat
	createChat(userId: string): Observable<ICreateCommunityResponse> {
		const request: CreateChatCommand = { partnerId: userId };
		return this.httpClient.post<ICreateCommunityResponse>(
			`${environment.baseUrl + this.chatsRoute}chat/${userId}`,
			request,
		);
	}

	// POST /api/communities/channel
	createChannel(request: CreateChannelCommand): Observable<ICreateCommunityResponse> {
		return this.httpClient.post<ICreateCommunityResponse>(`${environment.baseUrl + this.chatsRoute}channel`, request);
	}

	// GET /api/communities/searches
	searchChat(displayName: string): Observable<IGetUserChatsResponse> {
		return this.httpClient.get<IGetUserChatsResponse>(
			`${environment.baseUrl + this.chatsRoute}searches?displayName=${displayName}`,
		);
	}

	// PUT /api/communities/picture
	updateChatLogo(chatId: string, formData: FormData): Observable<IUpdateChatLogoResponse> {
		return this.httpClient.post<IUpdateChatLogoResponse>(
			`${environment.baseUrl + this.chatsRoute}picture/${chatId}`,
			formData,
		);
	}
}
