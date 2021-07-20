export class LogoutAllCommand {
    refreshTokenId: string;

    constructor(refreshTokenId: string) {
        this.refreshTokenId = refreshTokenId;
    }
}