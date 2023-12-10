import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { PasswordResetService } from '@core/services';
import type { Subscription } from 'rxjs';
import { EMPTY, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-password-restore-request',
	templateUrl: './password-restore-request.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule],
})
export class PasswordRestoreRequestComponent {
	protected resetPasswordSub$!: Subscription;
	private readonly passwordResetService = inject(PasswordResetService);
	private readonly snackbar = inject(MatSnackBar);
	private readonly destroyRef = inject(DestroyRef);
	phoneOrEmail = '';

	sendPasswordRestoreRequest(): void {
		if (!this.phoneOrEmail) {
			this.snackbar.open('Empty email or phone not allowed.');
			return;
		}

		this.resetPasswordSub$ = this.passwordResetService
			.sendPasswordResetRequest(this.phoneOrEmail)
			.pipe(
				catchError((error) => {
					this.snackbar.open(error.error.errorDetails);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((data) => {
				this.phoneOrEmail = '';
				this.snackbar.open(data.message);
			});
	}
}
