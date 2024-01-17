import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { IUser } from '@shared/types/models';
import type { Observable } from 'rxjs';
import { EMPTY, catchError } from 'rxjs';
import { ErrorNotificationService, SessionService } from '@core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileLogoutButtonComponent } from '@core/messenger/auxiliary';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-profile-settings-sidebar',
	templateUrl: './profile-settings-sidebar.component.html',
	standalone: true,
	imports: [ProfileLogoutButtonComponent, AsyncPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsSidebarComponent implements OnInit {
	private readonly sessionService = inject(SessionService);
	private readonly router = inject(Router);
	private readonly errorNotificationService = inject(ErrorNotificationService);
	private readonly destroyRef = inject(DestroyRef);
	user: IUser = {} as IUser;
	isLoaded = false;

	@Input() events$!: Observable<IUser>;

	ngOnInit(): void {
		this.events$
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnErrorWithComponentName(error, 'profile-settings-sidebar.');
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: (data) => {
					this.user = data;
					this.isLoaded = true;
				},
			});
	}

	logout(): void {
		const refreshToken = this.sessionService.getTokens()?.refreshToken;

		if (refreshToken === null || refreshToken === undefined) throw new Error('Localstorage tokens error.');

		this.sessionService
			.deleteSession(refreshToken)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnErrorWithComponentName(error, 'profile-settings-sidebar.');
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((_) => {
				this.sessionService.clearTokens();
				this.router.navigateByUrl('login').then((r) => r);
			});
	}

	logoutAll(): void {
		this.sessionService
			.deleteAllSessions()
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnErrorWithComponentName(error, 'profile-settings-sidebar.');
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((_) => {
				this.sessionService.clearTokens();

				this.router.navigateByUrl('login').then((r) => r);
			});
	}
}
