import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserChatsService } from '@core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-join-group',
	templateUrl: './join-group.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinGroupComponent {
	private readonly userChatService = inject(UserChatsService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly snackBar = inject(MatSnackBar);
	@Input() chatId = '';
	@Output() notifyParentOnJoinGroup = new EventEmitter();

	onJoinGroupClick(): void {
		this.userChatService
			.joinCommunity(this.chatId)
			.pipe(
				catchError((error) => {
					this.snackBar.open(error.error.errorDetails);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: () => {
					this.notifyParentOnJoinGroup.emit();
				},
			});
	}
}
