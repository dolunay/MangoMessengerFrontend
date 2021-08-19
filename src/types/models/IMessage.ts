export interface IMessage {
  messageId: string;
  userDisplayName: string;
  messageText: string;
  sentAt: string;
  editedAt: string;
  self: boolean;
}
