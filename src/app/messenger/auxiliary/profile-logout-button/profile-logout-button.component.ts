import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-logout-button',
  templateUrl: './profile-logout-button.component.html',
  styleUrls: ['./profile-logout-button.component.scss']
})
export class ProfileLogoutButtonComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input() ButtonText: string = 'Logout';

}
