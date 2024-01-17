import type { OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { EMPTY, catchError, combineLatest } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import type { EditMessageCommand } from '@shared/types/requests';
import { SendMessageCommand } from '@shared/types/requests';
import type { IChat } from '@shared/types/models';
import { CommunityType } from '@shared/types/enums';
import { DocumentsService, ErrorNotificationService, MessagesService, ValidationService } from '@core/services';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@Component({
	selector: 'app-chat-footer',
	templateUrl: './chat-footer.component.html',
	imports: [PickerModule, ReactiveFormsModule],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFooterComponent implements OnChanges {
	@ViewChild('fileInput', { read: ElementRef<HTMLInputElement> }) fileInput?: ElementRef<HTMLInputElement>;

	@Input() editMessageRequest: EditMessageCommand | null = null;
	@Input() replayMessageObject: any | null = null;
	@Input() chat: IChat = {
		communityType: CommunityType.DirectChat,
	} as IChat;

	private readonly messageService = inject(MessagesService);
	private readonly documentService = inject(DocumentsService);
	private readonly errorNotificationService = inject(ErrorNotificationService);
	private readonly validationService = inject(ValidationService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly fb = inject(FormBuilder);
	form = this.fb.group({
		currentMessageText: [''],
	});

	inReplayAuthor: string | null = null;
	inReplayText: string | null = null;

	attachmentName: string | null = '';

	attachment!: File | null;

	isEmojiPickerVisible = false;

	onMessageSendClick(event: any): void {
		event.preventDefault();

		this.validationService.validateField(this.form.get('currentMessageText')?.value as string, 'Message Text');

		if (this.editMessageRequest != null) {
			this.editMessage();
			return;
		}

		if (this.attachment) {
			this.sendMessageWithAttachment();
			return;
		}

		this.sendTextMessage();
	}

	private sendTextMessage() {
		this.validationService.validateField(this.form.get('currentMessageText')?.value as string, 'Message Text');
		const sendMessageCommand = new SendMessageCommand(
			this.form.get('currentMessageText')?.value as string,
			this.chat.chatId,
		);

		if (this.inReplayText && this.inReplayAuthor) {
			sendMessageCommand.setReplayToAuthor(this.inReplayAuthor);
			sendMessageCommand.setReplayToText(this.inReplayText);
		}

		this.messageService
			.sendMessage(sendMessageCommand)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: () => {
					this.clearMessageInput();
					this.clearInReplay();
				},
			});
	}

	private sendMessageWithAttachment() {
		if (!this.attachment) {
			this.clearMessageInput();
			this.clearInReplay();
			this.clearAttachment();
			return;
		}

		const formData = new FormData();

		const fileName = this.attachmentName ?? this.attachment.name;
		this.validationService.validateFileName(fileName);
		formData.append('formFile', this.attachment);
		const sendMessageCommand = new SendMessageCommand(
			this.form.get('currentMessageText')?.value as string,
			this.chat.chatId,
		);

		combineLatest([this.documentService.uploadDocument(formData), this.messageService.sendMessage(sendMessageCommand)])
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe({
				next: ([response, _]) => {
					const fileName = response.fileName;
					sendMessageCommand.setAttachmentUrl(fileName);
					this.clearAttachment();
					this.clearMessageInput();
				},
			});
	}

	private editMessage() {
		if (!this.editMessageRequest) {
			this.clearInEdit();
			this.clearMessageInput();
			return;
		}

		this.validationService.validateField(this.form.get('currentMessageText')?.value as string, 'Message Text');
		this.editMessageRequest.modifiedText = this.form.get('currentMessageText')?.value as string;

		this.messageService
			.editMessage(this.editMessageRequest)
			.pipe(
				catchError((error) => {
					this.errorNotificationService.notifyOnError(error);
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
		this.editMessageRequest = null;
		this.form.patchValue({
			currentMessageText: '',
		});
	}

	public addEmoji(event: any): void {
		this.form.patchValue({
			currentMessageText: `${this.form.get('currentMessageText')?.value}${event.emoji.native}`,
		});
		this.isEmojiPickerVisible = false;
	}

	attachDocument(event: Event): void {
		const target = event.target as HTMLInputElement;
		const files = target.files as FileList;
		const file = files[0];
		if (file) {
			this.attachment = file;
			this.attachmentName = file.name;
		}
	}

	clearAttachment(): void {
		if (this.fileInput) {
			this.fileInput.nativeElement.value = '';
			this.attachment = null;
			this.attachmentName = null;
		}
	}

	clearInReplay(): void {
		this.inReplayAuthor = null;
		this.inReplayText = null;
	}

	clearInEdit(): void {
		this.editMessageRequest = null;
		this.form.reset();
	}

	clearMessageInput(): void {
		this.form.reset();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.editMessageRequest = changes.editMessageRequest?.currentValue;

		if (this.editMessageRequest) {
			this.form.patchValue({
				currentMessageText: this.editMessageRequest.modifiedText,
			});
			return;
		}

		if (changes.replayMessageObject?.currentValue) {
			const author = changes.replayMessageObject?.currentValue.messageAuthor;
			const messageText = changes.replayMessageObject?.currentValue.messageText;
			this.inReplayAuthor = author;
			this.inReplayText = messageText;
		}
	}
}
