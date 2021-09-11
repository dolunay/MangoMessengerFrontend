import {Component, Input} from '@angular/core';
import {IChat} from "../../../../types/models/IChat";
import {GroupType} from "../../../../types/enums/GroupType";

@Component({
  selector: 'app-chat-item-active',
  templateUrl: './chat-item-active.component.html'
})
export class ChatItemActiveComponent {

  @Input() chat: IChat = {
    lastMessage: null,
    description: "",
    chatId: "",
    chatType: GroupType.DirectChat,
    chatLogoImageUrl: "",
    isArchived: false,
    membersCount: 0,
    title: "",
    isMember: false
  };

  chatContainsMessages(): boolean {
    return this.chat.lastMessage?.userDisplayName != null && this.chat.lastMessage != null;
  }

  getChatPictureUrl(): string {
    return this.chat.chatLogoImageUrl ? this.chat.chatLogoImageUrl : 'assets/media/avatar/3.png';
  }
}
