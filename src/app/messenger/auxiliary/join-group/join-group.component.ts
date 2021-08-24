import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserChatsService} from "../../../services/user-chats.service";

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss']
})
export class JoinGroupComponent {

  constructor(private userChatService: UserChatsService) {
  }

  @Input() chatId: string = '';
  @Output() notifyParentOnJoinGroup = new EventEmitter();

  onJoinGroupClick(): void {
    this.userChatService.postJoinChat(this.chatId).subscribe((_) => {
      this.notifyParentOnJoinGroup.emit();
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
