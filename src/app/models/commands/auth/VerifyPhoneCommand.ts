export class VerifyPhoneCommand {
  confirmationCode: number;
  
  constructor(confirmationCode: number) {
    this.confirmationCode = confirmationCode;
  }
}
