import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-profile-logout-button',
  templateUrl: './profile-logout-button.component.html'
})
export class ProfileLogoutButtonComponent {
  @Input() ButtonText: string = 'Logout';
}
