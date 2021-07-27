import {Component, OnInit} from '@angular/core';
import {GroupType} from "../../../../types/Chats/Enums/GroupType";
import {ChatsService} from "../../../services/chats.service";
import {CreateGroupCommand} from "../../../../types/Chats/Requests/CreateGroupCommand";
import {ICreateGroupResponse} from "../../../../types/Chats/Responses/ICreateGroupResponse";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chat-sidebar-header',
  templateUrl: './chat-sidebar-header.component.html',
  styleUrls: ['./chat-sidebar-header.component.scss']
})
export class ChatSidebarHeaderComponent implements OnInit {

  constructor(private chatService: ChatsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  chatTypes = [GroupType.PrivateChannel, GroupType.PublicChannel, GroupType.ReadOnlyChannel];
  groupType = GroupType.PublicChannel;

  // @ts-ignore
  groupName: string;

  ngOnInit(): void {
  }

  createGroup(): void {
    this.chatService.createGroup(new CreateGroupCommand(this.groupType, this.groupName))
      .subscribe((data: ICreateGroupResponse) => {

      }, error => {
        alert("error during creation of a group");
      })
  }

}
