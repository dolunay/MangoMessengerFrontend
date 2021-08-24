import {Component} from '@angular/core';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss']
})
export class ChatFooterComponent {

  constructor() {
  }

  currentMessageText: string = '';

  onMessageSendClick() : void {
    console.log(this.currentMessageText);
    this.currentMessageText = '';
  }

}
