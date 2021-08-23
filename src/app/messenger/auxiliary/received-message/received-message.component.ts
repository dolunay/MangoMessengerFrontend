import {Component, Input} from '@angular/core';
import {IMessage} from "../../../../types/models/IMessage";

@Component({
  selector: 'app-received-message',
  templateUrl: './received-message.component.html',
  styleUrls: ['./received-message.component.scss']
})
export class ReceivedMessageComponent {

  constructor() {
  }

  @Input() message: IMessage = {
    editedAt: "",
    messageId: "",
    messageText: "",
    self: false,
    sentAt: "",
    userDisplayName: ""
  };
}
