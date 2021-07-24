export class LogoutCommand {
  refreshTokenId: string | null;

  constructor(refreshTokenId: string | null) {
    this.refreshTokenId = refreshTokenId;
  }
}
