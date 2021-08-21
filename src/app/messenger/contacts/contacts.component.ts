import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../../services/contacts.service";
import {IContact} from "../../../types/models/IContact";
import {IGetContactsResponse} from "../../../types/responses/IGetContactsResponse";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../../types/models/IUser";
import {IGetUserResponse} from "../../../types/responses/IGetUserResponse";

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

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data: IGetContactsResponse) => {
      this.userContacts = data.contacts;
      this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
        this.currentUser = data.user;
      })
    }, error => {
      alert(error.message);
    })
  }

}
