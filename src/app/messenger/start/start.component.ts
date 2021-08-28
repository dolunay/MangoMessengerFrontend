import {Component, OnInit} from '@angular/core';
import {ChatsService} from "../../services/chats.service";
import {IGetUserChatsResponse} from "../../../types/responses/IGetUserChatsResponse";
import {GroupType} from "../../../types/enums/GroupType";
import {IMessage} from "../../../types/models/IMessage";
import {IChat} from "../../../types/models/IChat";
import {NewChatDialogComponent} from "../dialogs/new-chat-dialog/new-chat-dialog.component";
import {CreateGroupDialogComponent} from "../dialogs/create-group-dialog/create-group-dialog.component";
import {InviteOthersDialogComponent} from "../dialogs/invite-others-dialog/invite-others-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../../types/models/IUser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  messages: IMessage[] = [];
  chats: IChat[] = [];

  user: IUser = {
    address: "",
    bio: "",
    birthdayDate: "",
    displayName: "",
    email: "",
    facebook: "",
    firstName: "",
    instagram: "",
    lastName: "",
    linkedIn: "",
    phoneNumber: "",
    twitter: "",
    userId: "",
    username: "",
    website: ""
  };

  chatFilter = 'All Chats';
  searchQuery = '';

  constructor(private chatService: ChatsService,
              private userService: UsersService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatService.getUserChats().subscribe((data) => {
      this.getUserDisplayName();
      this.chats = data.chats;
    });
  }

  chatsAny(): boolean {
    return this.chats.length > 0;
  }

  openNewChatDialog(): void {
    const dialogRef = this.dialog.open(NewChatDialogComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openCreateGroupDialog(): void {
    this.dialog.open(CreateGroupDialogComponent);
  }

  openInviteOthersDialog(): void {
    this.dialog.open(InviteOthersDialogComponent);
  }

  onChatFilerClick(filter: string): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {

      switch (filter) {
        case 'All Chats':
          this.chats = data.chats.filter(x => !x.isArchived);
          break;
        case 'Groups':
          this.chats = data.chats.filter(x => x.chatType === GroupType.ReadOnlyChannel || x.chatType === GroupType.PublicChannel);
          break;
        case 'Direct Chats':
          this.chats = data.chats.filter(x => x.chatType === GroupType.DirectChat);
          break;
        case 'Archived':
          this.chats = data.chats.filter(x => x.isArchived);
          break;
        default:
          break;
      }

      this.chatFilter = filter;
      this.searchQuery = '';

    });
  }

  onSearchClick(): void {
    this.chatService.searchChat(this.searchQuery).subscribe((data) => {
      this.chats = data.chats;
      this.chatFilter = 'Search Results';
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  getUserDisplayName(): void {
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data.user;
    });
  }

  navigateContacts(): void {
    this.router.navigateByUrl('contacts').then(r => r);
  }

  navigateToChat(chatId: string): void {
    this.router.navigate(['main', {chatId: chatId}]).then(r => r);
  }
}
