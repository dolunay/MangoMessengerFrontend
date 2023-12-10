import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { PasswordResetService } from '@core/services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import type { TypedControl } from '@shared/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { ResetPasswordRequest } from '@shared/types/requests';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-password-restore-form',
	templateUrl: './password-restore-form.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, RouterLink],
})
export class PasswordRestoreFormComponent {
	private readonly passwordResetService = inject(PasswordResetService);
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly snackbar = inject(MatSnackBar);
	private readonly fb = inject(FormBuilder);
	private destroyRef = inject(DestroyRef);
	form = this.fb.group<TypedControl<ResetPasswordRequest>>({
		requestId: [null],
		newPassword: [''],
		repeatPassword: [''],
	});

	restorePassword(): void {
		if (this.form.get('newPassword')?.value !== this.form.get('repeatPassword')?.value) {
			this.snackbar.open('Passwords are different.');
			return;
		}
		this.form.patchValue({ requestId: this.route.snapshot.queryParamMap.get('requestId') });

		if (!this.form.get('requestId')?.value) {
			this.snackbar.open('Wrong password change request ID.');
			return;
		}

		const command: ResetPasswordRequest = {
			...(this.form.value as ResetPasswordRequest),
		};

		this.passwordResetService
			.resetPassword(command)
			.pipe(
				catchError((error) => {
					this.snackbar.open(error.error.errorDetails);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((_) => this.router.navigateByUrl('login').then(() => this.snackbar.open('Password reset success.')));
	}
}
