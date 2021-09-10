export interface IMessage {
  messageId: string;
  userDisplayName: string;
  messageText: string;
  createdAt: string;
  updatedAt: string;
  self: boolean;
  isEncrypted: boolean;
  authorPublicKey: number;
  pictureUrl: string;
}
