import {Component, OnInit} from '@angular/core';
import {GroupType} from "../../../../types/Chats/Enums/GroupType";
import {ChatsService} from "../../../services/chats.service";
import {CreateGroupCommand} from "../../../../types/Chats/Requests/CreateGroupCommand";
import {ICreateGroupResponse} from "../../../../types/Chats/Responses/ICreateGroupResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {Tokens} from "../../../../consts/Tokens";
import {IRefreshTokenResponse} from "../../../../types/Auth/Responses/IRefreshTokenResponse";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-chat-sidebar-header',
  templateUrl: './chat-sidebar-header.component.html',
  styleUrls: ['./chat-sidebar-header.component.scss']
})
export class ChatSidebarHeaderComponent implements OnInit {

  constructor(private chatService: ChatsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  chatTypes = [GroupType.PrivateChannel, GroupType.PublicChannel, GroupType.ReadOnlyChannel];
  groupType = GroupType.PublicChannel;

  // @ts-ignore
  groupName: string;

  ngOnInit(): void {
  }

  createGroup(): void {
    console.log(this.groupName);
    console.log(this.groupType);
    this.chatService.createGroup(new CreateGroupCommand(this.groupType, this.groupName))
      .subscribe((data: ICreateGroupResponse) => {

      }, error => {
        this.refreshToken();
        setTimeout(() => this.createGroup(), 0);
      })
  }

  refreshToken(): void {
    let refreshToken = localStorage.getItem(Tokens.refreshToken);
    this.authService.postRefreshSession(refreshToken).subscribe(
      (data: IRefreshTokenResponse) => {
        localStorage.setItem(Tokens.accessToken, data.accessToken);
        localStorage.setItem(Tokens.refreshToken, data.refreshToken);
      }, error => {
        this.router.navigateByUrl('login').then(r => alert(error.message));
      }
    )
  }
}
