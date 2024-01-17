import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { UsersService } from '@core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, map } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import type { IBaseResponse } from '@shared/types/responses';
import type { VerifyEmailCommand } from '@shared/types/requests';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly usersService = inject(UsersService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly snackBar = inject(MatSnackBar);
	private readonly emailCode = toSignal(
		this.route.queryParamMap.pipe(map((query) => query.get('emailCode') as string)),
		{ initialValue: '' },
	);

	private readonly email = toSignal(this.route.queryParamMap.pipe(map((query) => query.get('emailCode') as string)), {
		initialValue: '',
	});

	response = signal<IBaseResponse>({} as IBaseResponse);

	errorMessage = signal('');

	ngOnInit(): void {
		const command: VerifyEmailCommand = {
			emailCode: this.emailCode(),
			email: this.email(),
		};

		if (!this.email() || !this.emailCode()) {
			this.snackBar.open('Invalid or expired activation link.');
			return;
		}

		this.usersService
			.confirmEmail(command)
			.pipe(
				catchError((_) => {
					this.errorMessage.set('Invalid or expired activation link.');
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: (result) => this.response.set(result),
			});
	}

	async proceedToLoginComponent(): Promise<void> {
		await this.router.navigateByUrl('login');
	}
}
