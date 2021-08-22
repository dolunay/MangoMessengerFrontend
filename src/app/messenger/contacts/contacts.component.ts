import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../../services/contacts.service";
import {IContact} from "../../../types/models/IContact";
import {IGetContactsResponse} from "../../../types/responses/IGetContactsResponse";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../../types/models/IUser";
import {IGetUserResponse} from "../../../types/responses/IGetUserResponse";
import {ISearchResponse} from "../../../types/responses/ISearchResponse";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private contactsService: ContactsService, private userService: UsersService) {
  }

  userContacts: IContact[] = [];
  // @ts-ignore
  currentUser: IUser;

  currentUserId = '';
  userSearchQuery = '';
  contactsFilter = 'All Contacts';
  activeContactId = '';

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data: IGetContactsResponse) => {
      this.userContacts = data.contacts;
      this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
        this.currentUser = data.user;
      })
    }, error => {
      alert(error.error.ErrorMessage);
    })
  };

  onFilterClick(filter: string) {
    this.contactsFilter = filter;
    this.contactsService.getContacts().subscribe((data: IGetContactsResponse) => {
      this.userContacts = data.contacts;
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onUserSearchClick(): void {
    this.userService.postSearch(this.userSearchQuery).subscribe((data: ISearchResponse) => {
      this.userContacts = data.users
        .map(({userId, displayName, address, bio}) => ({userId, displayName, address, bio})) as IContact[];
      this.contactsFilter = 'Search Results';
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onContactClick(userId: string): void {
    this.userService.getUserById(userId).subscribe((data: IGetUserResponse) => {
      this.activeContactId = userId;
      this.currentUser = data.user;
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
