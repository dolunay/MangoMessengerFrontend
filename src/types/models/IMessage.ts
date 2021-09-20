export interface IMessage {
  messageId: string;
  userId: string;
  chatId: string;
  userDisplayName: string;
  messageText: string;
  createdAt: string;
  updatedAt: string;
  self: boolean;
  isEncrypted: boolean;
  authorPublicKey: number;
  messageAuthorPictureUrl: string;
}
