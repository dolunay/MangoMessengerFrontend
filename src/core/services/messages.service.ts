import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type {
	IBaseResponse,
	IDeleteMessageResponse,
	IGetChatMessagesResponse,
	ISendMessageResponse,
} from '@shared/types/responses';
import type { DeleteMessageCommand, EditMessageCommand, SendMessageCommand } from '@shared/types/requests';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class MessagesService {
	private messagesRoute = 'api/messages/';
	private httpClient = inject(HttpClient);

	// GET /api/messages/{chatId}
	getChatMessages(chatId: string): Observable<IGetChatMessagesResponse> {
		return this.httpClient.get<IGetChatMessagesResponse>(environment.baseUrl + this.messagesRoute + chatId);
	}

	// POST /api/messages
	sendMessage(request: SendMessageCommand): Observable<ISendMessageResponse> {
		return this.httpClient.post<ISendMessageResponse>(environment.baseUrl + this.messagesRoute, request);
	}

	// DELETE /api/messages/{messageId}
	deleteMessage(request: DeleteMessageCommand): Observable<IDeleteMessageResponse> {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
			body: request,
		};

		return this.httpClient.delete<IDeleteMessageResponse>(environment.baseUrl + this.messagesRoute, options);
	}

	// PUT /api/messages
	editMessage(request: EditMessageCommand): Observable<IBaseResponse> {
		return this.httpClient.put<IBaseResponse>(environment.baseUrl + this.messagesRoute, request);
	}

	// GET /api/messages/searches/{chatId}
	searchMessages(chatId: string, text: string): Observable<IGetChatMessagesResponse> {
		return this.httpClient.get<IGetChatMessagesResponse>(
			`${environment.baseUrl + this.messagesRoute}searches/${chatId}?messageText=${text}`,
		);
	}
}
