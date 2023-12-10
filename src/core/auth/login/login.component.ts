import { ErrorNotificationService, ValidationService } from '@core/services';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '@core/services/session.service';
import type { LoginCommand } from '@shared/types/requests';

import { MatImports } from '@shared/mat-imports';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import type { TypedControl } from '@shared/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [...MatImports, ReactiveFormsModule, RouterLink],
})
export class LoginComponent implements OnInit {
	private readonly sessionService = inject(SessionService);
	private readonly router = inject(Router);
	private readonly errorNotificationService = inject(ErrorNotificationService);
	private readonly validationService = inject(ValidationService);
	private readonly formBuilder = inject(FormBuilder);
	private readonly destroyRef = inject(DestroyRef);

	loginCommand = this.formBuilder.group<TypedControl<LoginCommand>>({
		email: [''],
		password: [''],
	});

	login(): void {
		this.validationService.validateField(this.loginCommand.get('email')?.value as string, 'Email');
		this.validationService.validateField(this.loginCommand.get('password')?.value as string, 'Password');

		this.sessionService
			.createSession(this.loginCommand.value as LoginCommand)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: (response) => {
					this.sessionService.setTokens(response.tokens);
					this.router.navigateByUrl('main').then((r) => r);
				},
			});
	}

	ngOnInit(): void {
		this.sessionService.clearTokens();
	}
}
