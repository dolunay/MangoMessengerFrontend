import {Component, Input} from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {SendMessageCommand} from "../../../../types/requests/SendMessageCommand";
import {IChat} from "../../../../types/models/IChat";
import {CommunityType} from "../../../../types/enums/CommunityType";
import {DocumentsService} from "../../../services/documents.service";

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html'
})
export class ChatFooterComponent {

  constructor(private messageService: MessagesService,
              private documentService: DocumentsService) {
  }

  currentMessageText: string = '';
  attachmentName: string | null = '';

  attachment!: File | null;

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
    let attachmentUrl: string | null = null;

    if (this.attachment) {
      const formData = new FormData();
      formData.append("formFile", this.attachment);
      this.documentService.uploadDocument(formData).subscribe(response => {
        attachmentUrl = response.fileUrl;
      }, error => {
        alert(error.error.ErrorMessage);
      })
    }

    const sendMessageCommand = new SendMessageCommand(this.currentMessageText, this.chat.chatId);

    if (attachmentUrl) {
      sendMessageCommand.setAttachmentUrl(attachmentUrl);
    }

    this.messageService.sendMessage(sendMessageCommand).subscribe(_ => {
      this.currentMessageText = '';
      this.attachmentName = null;
      this.attachment = null;
    }, error => {
      alert(error.error.ErrorMessage);
    })

  }

  attachDocument(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.attachment = file;
      this.attachmentName = file.name;
      console.log(this.attachment);
    }
  }
}
