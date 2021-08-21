import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {IUser} from "../../../types/models/IUser";
import {IGetUserResponse} from "../../../types/responses/IGetUserResponse";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  // @ts-ignore
  currentUser: IUser;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
      this.currentUser = data.user;
    }, error => {
      alert(error.message);
    })
  }

}
