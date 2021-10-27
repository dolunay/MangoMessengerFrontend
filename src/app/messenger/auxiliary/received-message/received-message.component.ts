import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {IMessage} from "../../../../types/models/IMessage";
import {MessagesService} from "../../../services/messages.service";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-received-message',
  templateUrl: './received-message.component.html'
})
export class ReceivedMessageComponent implements OnDestroy {

  constructor(private messageService: MessagesService) {
  }

  protected deleteMessageSub$!: Subscription;

  @Input() message: IMessage = {
    inReplayToAuthor: "",
    inReplayToText: "",
    messageAttachmentUrl: "",
    userId: "",
    chatId: "",
    messageAuthorPictureUrl: "",
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
    this.deleteMessageSub$ =
      this.messageService.deleteMessage(this.message.messageId).subscribe(_ => {
      }, error => alert(error.error.ErrorMessage));

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

    this.notifyParentOnReplayMessage.emit(body);
  }

  getMessageText(): string {
    return this.message.messageText;
  }

  ngOnDestroy(): void {
  }
}
