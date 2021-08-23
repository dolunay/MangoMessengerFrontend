import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IMessage} from "../../../../types/models/IMessage";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-received-message',
  templateUrl: './received-message.component.html',
  styleUrls: ['./received-message.component.scss']
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

  @Output() notifyParentOnDelete = new EventEmitter<string>();

  deleteMessage() : void {
    this.messageService.deleteMessage(this.message.messageId).subscribe((data) => {
      this.notifyParentOnDelete.emit(data.messageId);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
