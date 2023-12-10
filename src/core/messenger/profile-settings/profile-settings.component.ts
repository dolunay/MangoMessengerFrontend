import { ErrorNotificationService, SessionService, UsersService, ValidationService } from '@core/services';
import type { OnInit } from '@angular/core';
import { Component, DestroyRef, inject } from '@angular/core';

import type { Observable } from 'rxjs';
import { EMPTY, catchError } from 'rxjs';

import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import type {
	ChangePasswordCommand,
	UpdateAccountInformationCommand,
	UpdateUserSocialsCommand,
} from '@shared/types/requests';
import type { IUser } from '@shared/types/models';
import { MatImports } from '@shared/mat-imports';
import type { TypedControl } from '@shared/utils';
import { NavigationBarComponent, ProfileSettingsSidebarComponent } from '@core/messenger';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-profile-settings',
	templateUrl: './profile-settings.component.html',
	styleUrls: ['./profile-settings.component.scss'],
	imports: [...MatImports, FormsModule, ReactiveFormsModule, NavigationBarComponent, ProfileSettingsSidebarComponent],
	standalone: true,
})
export class ProfileSettingsComponent implements OnInit {
	private readonly userService = inject(UsersService);
	private readonly errorNotificationService = inject(ErrorNotificationService);
	private readonly sessionService = inject(SessionService);
	private readonly router = inject(Router);
	private readonly datePipe = inject(DatePipe);
	private readonly snackbar = inject(MatSnackBar);
	private readonly validationService = inject(ValidationService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly formBuilder = inject(FormBuilder);
	private userId: string | undefined = this.sessionService.getTokens()?.userId;
	eventsSubject!: Observable<IUser>;
	isLoaded = false;
	clonedUser!: IUser;
	currentPassword = '';
	newPassword = '';
	repeatNewPassword = '';
	fileName = '';
	file!: File;
	form = this.formBuilder.group<TypedControl<IUser>>({
		address: [''],
		bio: [''],
		birthdayDate: [''],
		email: [''],
		facebook: [''],
		firstName: [''],
		instagram: [''],
		lastName: [''],
		linkedIn: [''],
		twitter: [''],
		username: [''],
		website: [''],
		pictureUrl: ['', [Validators.required]],
		displayName: ['', []],
		userId: ['', []],
		publicKey: ['', []],
	});

	ngOnInit(): void {
		this.initializeView();
	}

	initializeView(): void {
		const userId = this.userId as string;
		this.userService
			.getUserById(userId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (currenrUserResponse) => {
					const { user } = currenrUserResponse;
					this.isLoaded = true;
					this.assignForm(user);
					this.cloneCurrentUser();
					this.emitEventToChild(this.clonedUser);
				},
				error: (err) => {
					this.errorNotificationService.notifyOnError(err);
				},
			});
	}

	private assignForm(user: IUser) {
		this.form.patchValue({
			...user,
		});
	}

	saveAccountInfo(): void {
		if (!this.validateDate(this.form.controls.birthdayDate.value as string)) {
			this.snackbar.open('Invalid birthday date format. Correct and try again.');
			return;
		}

		const command: UpdateAccountInformationCommand = {
			...(this.form.value as UpdateAccountInformationCommand),
		};

		this.validateUsersAccountInfo(command);
		this.userService
			.updateUserAccountInformation(command)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);

					if (error.status === 0 || error.status === 401 || error.status === 403)
						this.router.navigateByUrl('login').then((r) => r);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: () => {
					this.snackbar.open('Personal information has been updated successfully.');
					this.cloneCurrentUser();
					this.emitEventToChild(this.clonedUser);
				},
			});
	}

	saveSocialMediaInfo(): void {
		const command: UpdateUserSocialsCommand = { ...(this.form.value as UpdateUserSocialsCommand) };

		this.validateUsersSocials(command);

		this.userService
			.updateUserSocials(command)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);

					if (error.status === 0 || error.status === 401 || error.status === 403)
						this.router.navigateByUrl('login').then((r) => r);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: () => {
					this.snackbar.open('Social media links updated successfully.');
					this.cloneCurrentUser();
					this.emitEventToChild(this.clonedUser);
				},
			});
	}

	changePassword(): void {
		this.validationService.validateField(this.currentPassword, 'Current Password');
		this.validationService.validateField(this.newPassword, 'New Password');
		if (this.currentPassword === this.newPassword) {
			this.snackbar.open('New password should not equals current password.');
			return;
		}

		if (this.newPassword !== this.repeatNewPassword) {
			this.snackbar.open('Passwords are different.');
			return;
		}

		const command: ChangePasswordCommand = {
			currentPassword: this.currentPassword,
			newPassword: this.newPassword,
		};

		this.userService
			.changePassword(command)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					if (error.status === 0 || error.status === 401 || error.status === 403)
						this.router.navigateByUrl('login').then((r) => r);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: (data) => {
					this.snackbar.open(data.message);
				},
			});
	}

	updateProfilePicture(): void {
		const formData = new FormData();
		const pictureFileName = this.fileName ?? this.file.name;
		this.validationService.validateFileName(pictureFileName);
		formData.append('pictureFile', this.file);
		this.userService
			.updateProfilePicture(formData)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: (updateResponse) => {
					this.snackbar.open(updateResponse.message);
					this.form.patchValue({
						pictureUrl: updateResponse.newUserPictureUrl,
					});
					this.cloneCurrentUser();
					this.emitEventToChild(this.clonedUser);
				},
			});
	}

	onFileSelected(event: any): void {
		const file: File = event.target.files[0];

		if (file) {
			this.file = file;
			this.fileName = file.name;
		}
	}

	emitEventToChild(user: IUser): void {
		this.userService.assignSubject(user);
		this.eventsSubject = this.userService.getEvents();
	}

	private cloneCurrentUser = () => {
		this.clonedUser = JSON.parse(JSON.stringify(this.form.value));
		this.clonedUser.birthdayDate = this.datePipe.transform(this.clonedUser.birthdayDate, 'MM-dd-yyyy') as any;
	};

	validateDate(date: string): boolean {
		if (date === null) return false;

		const anyDate = date as any;
		const parsedDate = new Date(anyDate).getDate();
		return !Number.isNaN(parsedDate);
	}

	validateUsersAccountInfo(command: UpdateAccountInformationCommand) {
		this.validationService.validateField(command.displayName, 'Display Name');
		this.validationService.validateField(command.username, 'User Name');
		this.validationService.validateField(command.website, 'Web Site');
		this.validationService.validateField(command.bio, 'Bio');
		this.validationService.validateField(command.address, 'Address');
	}

	validateUsersSocials(command: UpdateUserSocialsCommand) {
		this.validationService.validateField(command.facebook, 'Facebook');
		this.validationService.validateField(command.instagram, 'Instagram');
		this.validationService.validateField(command.twitter, 'Twitter');
		this.validationService.validateField(command.linkedIn, 'LinkedIn');
	}
}
