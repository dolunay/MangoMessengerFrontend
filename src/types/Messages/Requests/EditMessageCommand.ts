export class EditMessageCommand {
    messageId: number
    modifiedText: string

    constructor(messageId: number, modifiedText: string) {
        this.messageId = messageId;
        this.modifiedText = modifiedText;
    }
}