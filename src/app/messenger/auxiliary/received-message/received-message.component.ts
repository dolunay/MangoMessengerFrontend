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

  @Output() notifyParentOnDeleteMessage = new EventEmitter<string>();

  deleteMessage(): void {
    let deleteSub = this.messageService.deleteMessage(this.message.messageId).subscribe(data => {
      this.notifyParentOnDeleteMessage.emit(data.messageId);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(deleteSub);
  }

  getMessageText(): string {
    return this.message.messageText;
  }
}
