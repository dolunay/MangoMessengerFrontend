import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import type { Subscription } from 'rxjs';
import { EMPTY, catchError } from 'rxjs';
import { CommunitiesService, ValidationService } from '@core/services';
import type { ICreateCommunityResponse } from '@shared/types/responses';
import { DialogRef } from '@angular/cdk/dialog';
import type { CreateChannelCommand } from '@shared/types/requests';
import { MatImports } from '@shared/mat-imports/mat-iьports';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import type { TypedControl } from '@shared/utils';
import { FocusInitialDirective } from '@shared/directives';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-create-group-dialog',
	templateUrl: './create-group-dialog.component.html',
	styleUrls: ['./create-group-dialog.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [...MatImports, ReactiveFormsModule, FocusInitialDirective],
})
export class CreateGroupDialogComponent {
	readonly dialogRef = inject(DialogRef);
	private readonly chatService = inject(CommunitiesService);
	private readonly validationService = inject(ValidationService);
	private readonly snackBar = inject(MatSnackBar);
	private readonly fb = inject(FormBuilder);
	form = this.fb.group<TypedControl<CreateChannelCommand>>({
		channelDescription: [''],
		channelTitle: [''],
	});

	constructor(@Inject(MAT_DIALOG_DATA) public data: ICreateCommunityResponse) {}

	protected createChannelSub$!: Subscription;

	onNoClick = () => this.dialogRef.close();

	onCreateGroupClick(): void {
		this.validationService.validateField(this.form.get('channelTitle')?.value as string, 'Group Title');
		this.validationService.validateField(this.form.get('channelDescription')?.value as string, 'Group Description');

		const createGroupCommand: CreateChannelCommand = {
			...(this.form.value as CreateChannelCommand),
		};

		this.createChannelSub$ = this.chatService
			.createChannel(createGroupCommand)
			.pipe(
				catchError((error) => {
					this.snackBar.open(error.error.errorDetails);
					return EMPTY;
				}),
			)
			.subscribe((_) => {
				this.dialogRef.close();
			});
	}
}
