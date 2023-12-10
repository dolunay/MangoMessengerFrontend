import type { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, requestHandlerInterceptor } from '@core/interceptors';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimations(),
		provideHttpClient(withInterceptors([requestHandlerInterceptor, authInterceptor])),
		provideRouter(routes),
	],
};
