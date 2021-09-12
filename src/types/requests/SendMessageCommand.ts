export class SendMessageCommand {
  messageText: string
  chatId: string;
  isEncrypted: boolean = false;
  attachmentUrl: string = '';

  constructor(content: string, chatId: string) {
    this.messageText = content;
    this.chatId = chatId;
  }
}
