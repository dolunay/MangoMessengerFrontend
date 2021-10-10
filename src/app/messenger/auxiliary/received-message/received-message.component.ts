import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {IMessage} from "../../../../types/models/IMessage";
import {MessagesService} from "../../../services/messages.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-received-message',
  templateUrl: './received-message.component.html'
})
export class ReceivedMessageComponent implements OnDestroy {

  constructor(private messageService: MessagesService) {
  }

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  @Input() message: IMessage = {
    messageAttachmentUrl: "",
    userId: "",
    chatId: "",
    messageAuthorPictureUrl: "",
    authorPublicKey: 0,
    isEncrypted: false,
    updatedAt: "",
    messageId: "",
    messageText: "",
    self: false,
    createdAt: "",
    userDisplayName: ""
  };

  @Output() notifyParentOnEditMessage = new EventEmitter<any>();

  deleteMessage(): void {
    let deleteSub = this.messageService.deleteMessage(this.message.messageId).subscribe(_ => {

    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(deleteSub);
  }

  editMessage(): void {
    const body = {
      messageId: this.message.messageId,
      messageText: this.message.messageText
    }

    this.notifyParentOnEditMessage.emit(body);
  }

  getMessageText(): string {
    return this.message.messageText;
  }
}
