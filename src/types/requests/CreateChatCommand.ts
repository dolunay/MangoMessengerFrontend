import {ChatType} from "../enums/ChatType";

export class CreateChatCommand {
  partnerId: string;
  chatType: ChatType;

  constructor(partnerId: string, chatType: ChatType) {
    this.partnerId = partnerId;
    this.chatType = chatType;
  }
}
