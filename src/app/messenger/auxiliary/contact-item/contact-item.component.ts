import {Component, Input} from '@angular/core';
import {IContact} from "../../../../types/models/IContact";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent {

  constructor() {
  }

  @Input() contactName = '';
  @Input() contactAddress = '';
  @Input() contactBio = '';

  @Input() contact: IContact = {
    address: "",
    bio: "",
    displayName: "",
    isContact: false,
    pictureUrl: "",
    userId: ""
  }

  getProfilePicture(): string {
    return this.contact.pictureUrl ? this.contact.pictureUrl : 'assets/media/avatar/3.png';
  }
}
