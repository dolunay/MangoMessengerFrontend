import {VerificationMethod} from "../enums/VerificationMethod";

export class RegisterCommand {
  phoneNumber: number;
  email: string;
  displayName: string;
  password: string;
  verificationMethod: VerificationMethod | number;
  termsAccepted: boolean;


  constructor(phoneNumber: number,
              email: string,
              displayName: string,
              password: string,
              verificationMethod: VerificationMethod | number,
              termsAccepted: boolean) {
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.displayName = displayName;
    this.password = password;
    this.verificationMethod = verificationMethod;
    this.termsAccepted = termsAccepted;
  }
}
