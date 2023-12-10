import { inject } from '@angular/core';
import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { EMPTY, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionService } from '@core/services';

function handleAuthError(err: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
	const sessionService = inject(SessionService);
	const router = inject(Router);
	const shouldHandle =
		err.status === 401 &&
		request.headers.has('Authorization') &&
		request.headers.get('Authorization')?.startsWith('Bearer');

	if (shouldHandle) {
		const refreshToken = sessionService.getTokens()?.refreshToken ?? '';

		const refreshTokenResponse = sessionService.refreshSession(refreshToken);
		return refreshTokenResponse
			.pipe(
				switchMap((response) => {
					sessionService.setTokens(response.tokens);

					return next(
						request.clone({
							setHeaders: {
								Authorization: `Bearer ${response.tokens.accessToken}`,
							},
							withCredentials: true,
						}),
					);
				}),
			)
			.pipe(
				catchError((_: HttpErrorResponse) => {
					router.navigate(['login']).then((r) => r);
					return EMPTY;
				}),
			);
	}

	return throwError(() => err);
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		catchError((error) => {
			if (error instanceof HttpErrorResponse && error.status === 401) return handleAuthError(error, req, next);

			return throwError(() => error);
		}),
	);
};
