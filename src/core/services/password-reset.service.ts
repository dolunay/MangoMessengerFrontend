import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { IBaseResponse } from '@shared/types/responses';
import type { ResetPasswordRequest } from '@shared/types/requests';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class PasswordResetService {
	private httpClient = inject(HttpClient);

	private currentRoute = 'api/password-restore-request/';

	// POST /api/password-restore-request/{emailOrPhone}
	sendPasswordResetRequest(email: string): Observable<IBaseResponse> {
		return this.httpClient.post<IBaseResponse>(environment.baseUrl + this.currentRoute + email, {});
	}

	// PUT /api/password-restore-request
	resetPassword(request: ResetPasswordRequest): Observable<IBaseResponse> {
		return this.httpClient.put<IBaseResponse>(environment.baseUrl + this.currentRoute, request);
	}
}
