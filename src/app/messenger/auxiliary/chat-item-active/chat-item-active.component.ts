import {Component, Input} from '@angular/core';
import {IChat} from "../../../../types/models/IChat";
import {ChatType} from "../../../../types/enums/ChatType";

@Component({
  selector: 'app-chat-item-active',
  templateUrl: './chat-item-active.component.html',
  styleUrls: ['./chat-item-active.component.scss']
})
export class ChatItemActiveComponent {

  constructor() {
  }

  @Input() chat: IChat = {
    chatId: "",
    chatType: ChatType.DirectChat,
    image: "",
    isArchived: false,
    lastMessage: "",
    lastMessageAt: "",
    lastMessageAuthor: "",
    membersCount: 0,
    title: "",
    isMember: false,
  };

  chatContainsMessages(): boolean {
    return this.chat.lastMessageAuthor != null && this.chat.lastMessage != null && this.chat.lastMessageAt != null;
  }
}
