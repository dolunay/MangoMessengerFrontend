import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { ErrorNotificationService, MessagesService } from '@core/services';
import { EMPTY, catchError } from 'rxjs';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteMessageCommand } from '@shared/types/requests';
import type { IMessage } from '@shared/types/models';

@Component({
	selector: 'app-received-message',
	templateUrl: './received-message.component.html',
	styleUrls: ['./received-message.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgClass],
})
export class ReceivedMessageComponent {
	private messageService = inject(MessagesService);
	private errorNotificationService = inject(ErrorNotificationService);

	// this abstract class was access to onDestroy lc hook and make unsubscribe if component will be destroyed
	private destroyRef = inject(DestroyRef);

	@Input() message: IMessage = {} as IMessage;

	@Output() notifyParentOnEditMessage = new EventEmitter<any>();
	@Output() notifyParentOnReplayMessage = new EventEmitter<any>();

	isImageOrGif(): boolean {
		const attachmentSplit = this.message.messageAttachmentUrl.split('.');
		const attachmentFileExtension = attachmentSplit[attachmentSplit.length - 1];

		return attachmentFileExtension === 'jpg' || attachmentFileExtension === 'png' || attachmentFileExtension === 'gif';
	}

	deleteMessage(): void {
		const deleteMessageCommand = new DeleteMessageCommand(this.message.messageId, this.message.chatId);

		this.messageService
			.deleteMessage(deleteMessageCommand)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnErrorWithComponentName(error, 'profile-settings-sidebar.');
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	editMessage(): void {
		const body = {
			messageId: this.message.messageId,
			messageText: this.message.messageText,
		};

		this.notifyParentOnEditMessage.emit(body);
	}

	replayMessage(): void {
		const body = {
			messageAuthor: this.message.userDisplayName,
			messageText: this.message.messageText,
		};

		this.notifyParentOnReplayMessage.emit(body);
	}

	getMessageText(): string {
		return this.message.messageText;
	}
}
