import {Component, Input} from '@angular/core';
import {IChat} from "../../../../types/models/IChat";
import {GroupType} from "../../../../types/enums/GroupType";

@Component({
  selector: 'app-chat-item-active',
  templateUrl: './chat-item-active.component.html'
})
export class ChatItemActiveComponent {

  @Input() chat: IChat = {
    description: "",
    chatId: "",
    chatType: GroupType.DirectChat,
    image: "",
    isArchived: false,
    lastMessage: "",
    lastMessageAt: "",
    lastMessageAuthor: "",
    membersCount: 0,
    title: "",
    isMember: false
  };

  chatContainsMessages(): boolean {
    return this.chat.lastMessageAuthor != null && this.chat.lastMessage != null && this.chat.lastMessageAt != null;
  }
}
