import {Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild} from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {SendMessageCommand} from "../../../../types/requests/SendMessageCommand";
import {IChat} from "../../../../types/models/IChat";
import {CommunityType} from "../../../../types/enums/CommunityType";
import {DocumentsService} from "../../../services/documents.service";
import {Subscription} from "rxjs";
import {EditMessageCommand} from "../../../../types/requests/EditMessageCommand";

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html'
})
export class ChatFooterComponent implements OnChanges, OnDestroy {

  constructor(private messageService: MessagesService,
              private documentService: DocumentsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editMessageRequest = changes.editMessageRequest?.currentValue;
    if (this.editMessageRequest != null) {
      this.currentMessageText = this.editMessageRequest.modifiedText;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  // @ts-ignore
  @ViewChild('fileInput') fileInput;

  @Input() editMessageRequest: EditMessageCommand | null = null;

  currentMessageText: string = '';

  attachmentName: string | null = '';

  attachment!: File | null;

  subscriptions: Subscription[] = [];

  isEmojiPickerVisible = false;

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

    if (this.editMessageRequest != null) {
      this.editMessageRequest.modifiedText = this.currentMessageText;

      let editSub = this.messageService.editMessage(this.editMessageRequest).subscribe(resp => {
        this.editMessageRequest = null;
        this.currentMessageText = '';
      }, error => {
        alert(error.error.ErrorMessage);
      })

      this.subscriptions.push(editSub);
      return;
    }

    if (this.attachment) {
      const formData = new FormData();
      formData.append("formFile", this.attachment);
      let uploadSub = this.documentService.uploadDocument(formData).subscribe(response => {
        const fileName = response.fileName;
        const sendMessageCommand = new SendMessageCommand(this.currentMessageText, this.chat.chatId);
        sendMessageCommand.setAttachmentUrl(fileName);
        let sendSub = this.messageService.sendMessage(sendMessageCommand).subscribe(_ => {
          this.currentMessageText = '';
          this.attachmentName = null;
          this.attachment = null;
        });

        this.subscriptions.push(sendSub);
      }, error => {
        alert(error.error.ErrorMessage);
      });

      this.subscriptions.push(uploadSub);
    } else {
      const sendMessageCommand = new SendMessageCommand(this.currentMessageText, this.chat.chatId);

      let sendSub = this.messageService.sendMessage(sendMessageCommand).subscribe(_ => {
        this.currentMessageText = '';
      }, error => {
        alert(error.error.ErrorMessage);
      });

      this.subscriptions.push(sendSub);
    }
  }

  public addEmoji(event: any): void {
    this.currentMessageText = `${this.currentMessageText}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
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
