export class LogoutCommand {
    refreshTokenId : string;

    constructor(refreshTokenId: string) {
        this.refreshTokenId = refreshTokenId;
    }
}