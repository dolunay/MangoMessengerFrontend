export class SendMessageCommand {
  messageText: string
  chatId: string;

  constructor(content: string, chatId: string) {
    this.messageText = content;
    this.chatId = chatId;
  }
}
