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
    image: "",
    isArchived: false,
    membersCount: 0,
    title: "",
    isMember: false
  };

  chatContainsMessages(): boolean {
    return this.chat.lastMessage?.userDisplayName != null && this.chat.lastMessage != null;
  }
}
