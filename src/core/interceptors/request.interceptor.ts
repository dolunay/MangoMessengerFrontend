import { inject } from '@angular/core';
import type { HttpInterceptorFn } from '@angular/common/http';

import { SessionService } from '../services/session.service';

export const requestHandlerInterceptor: HttpInterceptorFn = (req, next) => {
	const service = inject(SessionService);
	const token = service.getTokens()?.accessToken;
	const requestWithHeaders = req.clone({
		headers: req.headers.set('Authorization', `Bearer ${token}`),
	});
	if (token) return next(requestWithHeaders);

	return next(req);
};
