import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'main',
		loadComponent: () => import('./main/main.component').then((c) => c.MainComponent),
	},
	{
		path: 'main/:chatId',
		loadComponent: () => import('./main/main.component').then((c) => c.MainComponent),
	},
	{
		path: 'contacts',
		loadComponent: () => import('./contacts/contacts.component').then((c) => c.ContactsComponent),
	},
	{
		path: 'profile-settings',
		loadComponent: () =>
			import('./profile-settings/profile-settings.component').then((c) => c.ProfileSettingsComponent),
	},
	{
		path: 'verify-email-note',
		loadComponent: () =>
			import('./auxiliary/verify-email-note/verify-email-note.component').then((c) => c.VerifyEmailNoteComponent),
	},
	{
		path: 'restore-password-request',
		loadComponent: () =>
			import('./password-restore-request/password-restore-request.component').then(
				(c) => c.PasswordRestoreRequestComponent,
			),
	},
	{
		path: 'restore-password-form',
		loadComponent: () =>
			import('./password-restore-form/password-restore-form.component').then((c) => c.PasswordRestoreFormComponent),
	},
	{
		path: 'restore-password-form/:requestId',
		loadComponent: () =>
			import('./password-restore-form/password-restore-form.component').then((c) => c.PasswordRestoreFormComponent),
	},
	{ path: '', redirectTo: '/main', pathMatch: 'full' },
];
