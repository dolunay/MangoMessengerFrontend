export class SendMessageCommand {
  messageText: string
  chatId: string;
  isEncrypted: boolean = false;
  attachmentUrl: string | null = null;

  constructor(content: string, chatId: string) {
    this.messageText = content;
    this.chatId = chatId;
  }

  setAttachmentUrl(url: string | null): void {
    this.attachmentUrl = url;
  }
}
