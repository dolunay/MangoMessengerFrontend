export class LoginCommand {
  emailOrPhone: string;
  password: string;

  constructor(emailOrPhone: string, password: string) {
    this.emailOrPhone = emailOrPhone;
    this.password = password;
  }
}
