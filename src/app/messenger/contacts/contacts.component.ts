import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../../services/contacts.service";
import {IContact} from "../../../types/models/IContact";
import {IGetContactsResponse} from "../../../types/responses/IGetContactsResponse";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../../types/models/IUser";
import {IGetUserResponse} from "../../../types/responses/IGetUserResponse";
import {ISearchResponse} from "../../../types/responses/ISearchResponse";
import {IAddContactResponse} from "../../../types/responses/IAddContactResponse";
import {ChatsService} from "../../services/chats.service";
import {ICreateDirectChatResponse} from "../../../types/responses/ICreateDirectChatResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {IDeleteContactResponse} from "../../../types/responses/IDeleteContactResponse";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private contactsService: ContactsService, private userService: UsersService,
              private chatsService: ChatsService, private route: ActivatedRoute,
              private router: Router) {
  }

  userContacts: IContact[] = [];
  // @ts-ignore
  currentUser: IUser;
  userSearchQuery = '';
  contactsFilter = 'All Contacts';
  activeContactId = '';

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data: IGetContactsResponse) => {
      this.userContacts = data.contacts;
      this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
        this.currentUser = data.user;
        this.activeContactId = data.user.userId;
      })
    }, error => {
      alert(error.error.ErrorMessage);
    });
  };

  onFilterClick(filter: string) {
    this.contactsFilter = filter;
    this.contactsService.getContacts().subscribe((data: IGetContactsResponse) => {
      this.userContacts = data.contacts;
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onUserSearchClick(): void {
    this.userService.postSearch(this.userSearchQuery).subscribe((data: ISearchResponse) => {
      this.userContacts = data.users
        .map(({userId, displayName, address, bio}) => ({userId, displayName, address, bio})) as IContact[];
      this.contactsFilter = 'Search Results';
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onContactClick(userId: string): void {
    this.userService.getUserById(userId).subscribe((data: IGetUserResponse) => {
      this.activeContactId = userId;
      this.currentUser = data.user;
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onAddContactClick() {
    this.contactsService.postAddContact(this.activeContactId).subscribe((data: IAddContactResponse) => {
      this.onFilterClick('All Contacts');
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onSendMessageClick() {
    this.chatsService.createDirectChat(this.activeContactId).subscribe((data: ICreateDirectChatResponse) => {
      this.router.navigate(['main', {chatId: data.chatId}]).then(r => r);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onRemoveContactClick() {
    this.contactsService.deleteContact(this.activeContactId).subscribe((data: IDeleteContactResponse) => {
      this.onFilterClick('All Contacts');
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
