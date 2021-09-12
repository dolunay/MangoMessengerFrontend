import {Component, OnInit} from '@angular/core';
import {ChatsService} from "../../services/chats.service";
import {IMessage} from "../../../types/models/IMessage";
import {IChat} from "../../../types/models/IChat";
import {CreateGroupDialogComponent} from "../dialogs/create-group-dialog/create-group-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../../types/models/IUser";
import {ActivatedRoute, Router} from "@angular/router";
import {CommunityType} from "../../../types/enums/CommunityType";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  messages: IMessage[] = [];
  chats: IChat[] = [];

  user: IUser = {
    pictureUrl: "",
    publicKey: 0,
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
              public userService: UsersService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatService.getUserChats().subscribe(getUserChatsResponse => {
      this.getUserDisplayName();
      this.chats = getUserChatsResponse.chats;
    });
  }

  chatsAny(): boolean {
    return this.chats.length > 0;
  }

  openCreateGroupDialog(): void {
    this.dialog.open(CreateGroupDialogComponent);
  }

  onChatFilerClick(filter: string): void {
    this.chatService.getUserChats().subscribe(getUserChatsResponse => {

      switch (filter) {
        case 'All Chats':
          this.chats = getUserChatsResponse.chats.filter(x => !x.isArchived);
          break;
        case 'Groups':
          this.chats = getUserChatsResponse.chats.filter(x => x.communityType === CommunityType.ReadOnlyChannel
            || x.communityType === CommunityType.PublicChannel);
          break;
        case 'Direct Chats':
          this.chats = getUserChatsResponse.chats.filter(x => x.communityType === CommunityType.DirectChat);
          break;
        case 'Archived':
          this.chats = getUserChatsResponse.chats.filter(x => x.isArchived);
          break;
        default:
          break;
      }

      this.chatFilter = filter;
      this.searchQuery = '';

    });
  }

  onSearchClick(): void {
    this.chatService.searchChat(this.searchQuery).subscribe(getUserChatsResponse => {
      this.chats = getUserChatsResponse.chats;
      this.chatFilter = 'Search Results';
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  getUserDisplayName(): void {
    this.userService.getCurrentUser().subscribe(getUserResponse => {
      this.user = getUserResponse.user;
    });
  }

  navigateContacts(): void {
    this.router.navigateByUrl('contacts').then(r => r);
  }

  navigateToMain(chatId: string): void {
    this.router.navigate(['main', {chatId: chatId}]).then(r => r);
  }
}
