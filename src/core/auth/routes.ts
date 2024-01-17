import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'register',
		loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent),
	},
	{
		path: 'login',
		loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
	},
	{
		path: 'verify-email',
		loadComponent: () => import('./verify-email/verify-email.component').then((c) => c.VerifyEmailComponent),
	},
];
