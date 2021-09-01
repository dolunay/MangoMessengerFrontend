import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent {

  @Input() contactName = '';
  @Input() contactAddress = '';
  @Input() contactBio = '';
}
