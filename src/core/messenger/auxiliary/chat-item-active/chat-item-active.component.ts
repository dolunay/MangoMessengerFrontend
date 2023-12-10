import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { IChat } from '@shared/types/models';
import { DefaultImagePipe } from '@core/pipes/default-image.pipe';

@Component({
	selector: 'app-chat-item-active',
	templateUrl: './chat-item-active.component.html',
	styleUrls: ['./chat-item-active.component.scss'],
	standalone: true,
	imports: [DefaultImagePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatItemActiveComponent {
	@Input() chat: IChat = {} as IChat;
	readonly defaultImage = 'assets/media/avatar/3.png';

	chatContainsMessages(): boolean {
		return this.chat.lastMessageAuthor != null && this.chat.lastMessageText != null;
	}
}
