import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IMessage} from "../../../../types/models/IMessage";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-received-message',
  templateUrl: './received-message.component.html'
})
export class ReceivedMessageComponent {

  constructor(private messageService: MessagesService) {
  }

  @Input() message: IMessage = {
    editedAt: "",
    messageId: "",
    messageText: "",
    self: false,
    sentAt: "",
    userDisplayName: ""
  };

  @Output() notifyParentOnDeleteMessage = new EventEmitter<string>();

  deleteMessage(): void {
    this.messageService.deleteMessage(this.message.messageId).subscribe((data) => {
      this.notifyParentOnDeleteMessage.emit(data.messageId);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
