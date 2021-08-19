export class RefreshTokenCommand {
    refreshTokenId : string | null;

  constructor(refreshTokenId: string | null) {
        this.refreshTokenId = refreshTokenId;
    }
}
