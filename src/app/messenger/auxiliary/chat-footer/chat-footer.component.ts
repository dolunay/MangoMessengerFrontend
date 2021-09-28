import {Component, Input, ViewChild} from '@angular/core';
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

  // @ts-ignore
  @ViewChild('fileInput') fileInput;

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

  onMessageSendClick(event: any): void {
    event.preventDefault();
    if (this.attachment) {
      const formData = new FormData();
      formData.append("formFile", this.attachment);
      this.documentService.uploadDocument(formData).subscribe(response => {
        const fileName = response.fileName;
        const sendMessageCommand = new SendMessageCommand(this.currentMessageText, this.chat.chatId);
        sendMessageCommand.setAttachmentUrl(fileName);
        this.messageService.sendMessage(sendMessageCommand).subscribe(_ => {
          this.currentMessageText = '';
          this.attachmentName = null;
          this.attachment = null;
        }, error => {
          alert(error.error.ErrorMessage);
        })
      }, error => {
        alert(error.error.ErrorMessage);
      })
    } else {
      const sendMessageCommand = new SendMessageCommand(this.currentMessageText, this.chat.chatId);
      this.messageService.sendMessage(sendMessageCommand).subscribe(_ => {
        this.currentMessageText = '';
      }, error => {
        alert(error.error.ErrorMessage);
      })
    }
  }

  attachDocument(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.attachment = file;
      this.attachmentName = file.name;
    }
  }

  deleteAttachment(): void {
    this.fileInput.nativeElement.value = "";
    this.attachment = null;
    this.attachmentName = null;
  }
}
