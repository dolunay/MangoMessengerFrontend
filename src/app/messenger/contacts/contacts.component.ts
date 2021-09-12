import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../../services/contacts.service";
import {IContact} from "../../../types/models/IContact";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../../types/models/IUser";
import {ChatsService} from "../../services/chats.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  constructor(private contactsService: ContactsService,
              public userService: UsersService,
              private chatsService: ChatsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  contacts: IContact[] = [];

  currentOpenedUser: IUser = {
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

  contactsSearchQuery = '';
  contactsFilter = 'All Contacts';
  currentOpenedUserIsContact = false;

  ngOnInit(): void {
    this.initializeView();
  }

  initializeView(): void {
    this.contactsService.getCurrentUserContacts().subscribe(getContactsResponse => {
      this.contacts = getContactsResponse.contacts;
      this.userService.getCurrentUser().subscribe(getUserResponse => {
        this.currentOpenedUser = getUserResponse.user;
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
    this.contactsService.getCurrentUserContacts().subscribe(getContactsResponse => {
      this.contacts = getContactsResponse.contacts;
      this.contactsSearchQuery = '';
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onUserSearchClick(): void {
    this.contactsService.searchContacts(this.contactsSearchQuery).subscribe(searchContactsResponse => {
      this.contacts = searchContactsResponse.contacts;
      this.contactsFilter = 'Search Results';
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onContactClick(contact: IContact): void {
    this.userService.getUserById(contact.userId).subscribe(getUserResponse => {
      this.currentOpenedUser = getUserResponse.user;
      this.currentOpenedUserIsContact = contact.isContact;
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onAddContactClick() {
    this.contactsService.postAddContact(this.currentOpenedUser.userId).subscribe(_ => {
      this.onFilterClick('All Contacts');
      this.contactsSearchQuery = '';
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  onSendMessageClick() {
    this.chatsService.createChat(this.currentOpenedUser.userId).subscribe(createChatResponse => {
      this.router.navigate(['main', {chatId: createChatResponse.chatId}]).then(r => r);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onRemoveContactClick() {
    this.contactsService.deleteContact(this.currentOpenedUser.userId).subscribe(_ => {
      this.initializeView();
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  getContactItemClass(userId: string): string {
    return userId === this.currentOpenedUser.userId ? 'contacts-item active' : 'contacts-item';
  }
}
