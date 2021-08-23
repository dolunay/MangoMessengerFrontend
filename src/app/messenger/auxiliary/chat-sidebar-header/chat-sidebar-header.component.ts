import {Component, Input, OnInit} from '@angular/core';
import {ChatsService} from "../../../services/chats.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../../services/session.service";
import {GroupType} from "../../../../types/enums/GroupType";
import {CreateGroupCommand} from "../../../../types/requests/CreateGroupCommand";

@Component({
  selector: 'app-chat-sidebar-header',
  templateUrl: './chat-sidebar-header.component.html',
  styleUrls: ['./chat-sidebar-header.component.scss']
})
export class ChatSidebarHeaderComponent implements OnInit {

  constructor(private chatService: ChatsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: SessionService) {
  }

  chatTypes = [GroupType.PrivateChannel, GroupType.PublicChannel, GroupType.ReadOnlyChannel];
  groupType = GroupType.PublicChannel;

  @Input() headerTitle = '';
  @Input() placeHolder = '';

  // @ts-ignore
  groupName: string;

  ngOnInit(): void {
  }

  createGroup(): void {
    this.chatService.createGroup(new CreateGroupCommand(this.groupType, this.groupName))
      .subscribe((_) => {
      }, error => {
      })
  }
}
