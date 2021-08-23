export class ArchiveChatCommand {
  chatId: string;
  archived: boolean;

  constructor(chatId: string, archived: boolean) {
    this.chatId = chatId;
    this.archived = archived;
  }
}
