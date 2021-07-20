export class SendMessageCommand {
    content: string
    chatId: number
    
    constructor(content: string, chatId: number) {
        this.content = content;
        this.chatId = chatId;
    }
}