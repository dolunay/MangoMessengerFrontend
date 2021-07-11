export class RegisterCommand {
  phoneNumber: string;
  email: string;
  displayName: string;
  password: string;
  verificationMethod: number;
  termsAccepted: boolean;


  constructor(phoneNumber: string,
              email: string,
              displayName: string,
              password: string,
              verificationMethod: number,
              termsAccepted: boolean) {
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.displayName = displayName;
    this.password = password;
    this.verificationMethod = verificationMethod;
    this.termsAccepted = termsAccepted;
  }
}
