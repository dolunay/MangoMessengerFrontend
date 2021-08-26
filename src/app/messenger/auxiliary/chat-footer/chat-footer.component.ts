import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {SendMessageCommand} from "../../../../types/requests/SendMessageCommand";

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss']
})
export class ChatFooterComponent {

  constructor(private messageService: MessagesService) {
  }



  currentMessageText: string = '';
  @Input() chatId: string = '';

  @Output() notifyParentOnSendMessage = new EventEmitter();

  sendMessage(event: any): void {
    return this.onMessageSendClick(event)
  }

  onMessageSendClick(event: any): void {
    const sendMessageCommand = new SendMessageCommand(this.currentMessageText, this.chatId);
    this.messageService.sendMessage(sendMessageCommand).subscribe((_) => {
      this.currentMessageText = '';
      this.notifyParentOnSendMessage.emit();
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

}
