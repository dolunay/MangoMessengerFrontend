import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../../services/contacts.service";
import {IContact} from "../../../types/models/IContact";
import {IGetContactsResponse} from "../../../types/responses/IGetContactsResponse";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private contactsService: ContactsService) {
  }

  userContacts: IContact[] = [];

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((data: IGetContactsResponse) => {
      this.userContacts = data.contacts;
    }, error => {
      alert(error.message);
    })
  }

}
