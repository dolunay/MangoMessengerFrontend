export class CreateDirectChatCommand {
    partnerId: string;
    
    constructor(partnerId: string) {
        this.partnerId = partnerId;
    }
}