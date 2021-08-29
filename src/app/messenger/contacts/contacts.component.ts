import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../../services/contacts.service";
import {IContact} from "../../../types/models/IContact";
import {IGetContactsResponse} from "../../../types/responses/IGetContactsResponse";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../../types/models/IUser";
import {IGetUserResponse} from "../../../types/responses/IGetUserResponse";
import {ISearchContactsResponse} from "../../../types/responses/ISearchContactsResponse";
import {ChatsService} from "../../services/chats.service";
import {ICreateChatResponse} from "../../../types/responses/ICreateChatResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {IBaseResponse} from "../../../types/responses/IBaseResponse";

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

  contacts: IContact[] = [];

  currentOpenedUser: IUser = {
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

  contactsSearchQuery = '';
  contactsFilter = 'All Contacts';
  currentOpenedUserIsContact = false;

  ngOnInit(): void {
    this.initializeView();
  }

  initializeView(): void {
    this.contactsService.getCurrentUserContacts().subscribe((data: IGetContactsResponse) => {
      this.contacts = data.contacts;
      this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
        this.currentOpenedUser = data.user;
        this.currentOpenedUserIsContact = true;
        this.contactsFilter = 'All Contacts';
        this.contactsSearchQuery = '';
      })
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onFilterClick(filter: string) {
    this.contactsFilter = filter;
    this.contactsService.getCurrentUserContacts().subscribe((data: IGetContactsResponse) => {
      this.contacts = data.contacts;
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onUserSearchClick(): void {
    this.contactsService.searchContacts(this.contactsSearchQuery).subscribe((data: ISearchContactsResponse) => {
      this.contacts = data.contacts;
      this.contactsFilter = 'Search Results';
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onContactClick(contact: IContact): void {
    this.userService.getUserById(contact.userId).subscribe((data: IGetUserResponse) => {
      this.currentOpenedUser = data.user;
      this.currentOpenedUserIsContact = contact.isContact;
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onAddContactClick() {
    this.contactsService.postAddContact(this.currentOpenedUser.userId).subscribe((_) => {
      this.onFilterClick('All Contacts');
      this.contactsSearchQuery = '';
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onSendMessageClick() {
    this.chatsService.createDirectChat(this.currentOpenedUser.userId).subscribe((data: ICreateChatResponse) => {
      this.router.navigate(['main', {chatId: data.chatId}]).then(r => r);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onRemoveContactClick() {
    this.contactsService.deleteContact(this.currentOpenedUser.userId).subscribe((_: IBaseResponse) => {
      this.initializeView();
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
