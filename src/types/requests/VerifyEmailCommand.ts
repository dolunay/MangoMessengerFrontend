export class VerifyEmailCommand {
  email: string | null;
  userId: string | null;

  constructor(email: string | null, userId: string | null) {
    this.email = email;
    this.userId = userId;
  }
}
