import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { RegisterCommand } from '@shared/types/requests';
import { ErrorNotificationService, UsersService, ValidationService } from '@core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import type { TypedControl } from '@shared/utils';
import { EMPTY, catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
	private readonly usersService = inject(UsersService);
	private readonly router = inject(Router);
	private readonly snackBar = inject(MatSnackBar);
	private readonly errorNotificationService = inject(ErrorNotificationService);
	private readonly validationService = inject(ValidationService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly fb = inject(FormBuilder);

	registerCommand = this.fb.group<TypedControl<RegisterCommand>>({
		displayName: [''],
		email: [''],
		password: [''],
		termsAccepted: [''],
	});

	register(): void {
		this.validationService.validateField(this.registerCommand.get('email')?.value as string, 'Email');
		this.validationService.validateField(this.registerCommand.get('displayName')?.value as string, 'Display Name');
		this.validationService.validateField(this.registerCommand.get('password')?.value as string, 'Password');

		if (!this.registerCommand.get('termsAccepted')?.value) {
			this.snackBar.open('Terms of service must be accepted.');
			return;
		}

		this.usersService
			.createUser(this.registerCommand.value as RegisterCommand)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: () => {
					this.router.navigateByUrl('verify-email-note').then((r) => r);
				},
			});
	}
}
