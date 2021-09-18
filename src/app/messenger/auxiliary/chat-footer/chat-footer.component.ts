import {Component, Input} from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {SendMessageCommand} from "../../../../types/requests/SendMessageCommand";
import {IChat} from "../../../../types/models/IChat";
import {CommunityType} from "../../../../types/enums/CommunityType";

@Component({
    selector: 'app-chat-footer',
    templateUrl: './chat-footer.component.html'
})
export class ChatFooterComponent {

    constructor(private messageService: MessagesService) {
    }

    currentMessageText: string = '';

    @Input() chat: IChat = {
        chatId: "",
        chatLogoImageUrl: "",
        communityType: CommunityType.DirectChat,
        description: "",
        isArchived: false,
        isMember: false,
        lastMessage: null,
        membersCount: 0,
        title: ""
    }

    onMessageSendClick(): void {
        const sendMessageCommand = new SendMessageCommand(this.currentMessageText, this.chat.chatId);
        this.messageService.sendMessage(sendMessageCommand).subscribe(_ => {
            this.currentMessageText = '';
        }, error => {
            alert(error.error.ErrorMessage);
        })

    }
}
