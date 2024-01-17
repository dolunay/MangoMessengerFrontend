import type { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadChildren: () => import('@core/messenger/routes').then((r) => r.routes) },
	{ path: '', loadChildren: () => import('@core/auth/routes').then((r) => r.routes) },
];
