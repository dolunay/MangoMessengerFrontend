export class VerifyPhoneCommand {
  confirmationCode: number;
  userId: string | null;

  constructor(confirmationCode: number, userId: string | null) {
    this.confirmationCode = confirmationCode;
    this.userId = userId;
  }
}
