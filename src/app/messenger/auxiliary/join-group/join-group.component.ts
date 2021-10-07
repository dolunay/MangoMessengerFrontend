import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {UserChatsService} from "../../../services/user-chats.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html'
})
export class JoinGroupComponent implements OnDestroy {

  constructor(private userChatService: UserChatsService) {
  }

  @Input() chatId: string = '';
  @Output() notifyParentOnJoinGroup = new EventEmitter();
  subscriptions: Subscription[] = [];

  onJoinGroupClick(): void {
    let joinSub = this.userChatService.postJoinChat(this.chatId).subscribe((_) => {
      this.notifyParentOnJoinGroup.emit();
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(joinSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
