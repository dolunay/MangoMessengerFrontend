export class LogoutAllCommand {
  refreshTokenId: string | null;

  constructor(refreshTokenId: string | null) {
    this.refreshTokenId = refreshTokenId;
  }
}
