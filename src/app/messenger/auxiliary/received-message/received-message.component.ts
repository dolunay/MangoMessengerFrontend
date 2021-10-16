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
    inReplayToAuthor: "",
    inReplayToText: "",
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
  @Output() notifyParentOnReplayMessage = new EventEmitter<any>();

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

  replayMessage(): void {
    const body = {
      messageAuthor: this.message.userDisplayName,
      messageText: this.message.messageText,
    }

    console.log('received message user name', body.messageAuthor);

    this.notifyParentOnReplayMessage.emit(body);
  }

  getMessageText(): string {
    return this.message.messageText;
  }
}
