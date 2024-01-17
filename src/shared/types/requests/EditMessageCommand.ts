export interface EditMessageCommand {
	messageId: string;
	chatId: string;
	modifiedText: string;
}
