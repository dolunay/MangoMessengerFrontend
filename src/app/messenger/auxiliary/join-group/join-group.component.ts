import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {UserChatsService} from "../../../services/user-chats.service";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html'
})
export class JoinGroupComponent implements OnDestroy {

  constructor(private userChatService: UserChatsService) {
  }

  protected joinCommunitySub$!: Subscription;

  @Input() chatId: string = '';
  @Output() notifyParentOnJoinGroup = new EventEmitter();

  onJoinGroupClick(): void {
    this.joinCommunitySub$ = this.userChatService.joinCommunity(this.chatId).subscribe(_ => {
      this.notifyParentOnJoinGroup.emit();
    }, error => alert(error.error.errorDetails));
  }

  ngOnDestroy(): void {
  }
}
