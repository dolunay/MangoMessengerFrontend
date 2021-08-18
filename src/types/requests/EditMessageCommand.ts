export class EditMessageCommand {
    messageId: string
    modifiedText: string

    constructor(messageId: string, modifiedText: string) {
        this.messageId = messageId;
        this.modifiedText = modifiedText;
    }
}
