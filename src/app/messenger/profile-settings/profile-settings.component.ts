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
  firstName: string = '';
  lastName: string = '';
  displayName: string = '';
  mobileNumber: string = '';
  birthdayDate: string = '';
  email: string = '';
  website: string = '';
  username: string = '';
  bio: string = '';
  address: string = '';
  facebook: string = '';
  twitter: string = '';
  instagram: string = '';
  linkedIn: string = '';

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
      this.currentUser = data.user;
      this.firstName = data.user.firstName;
      this.lastName = data.user.lastName;
      this.displayName = data.user.displayName;
      this.mobileNumber = data.user.phoneNumber;
      this.birthdayDate = data.user.birthdayDate;
      this.email = data.user.email;
      this.website = data.user.webSite;
      this.username = data.user.username;
      this.bio = data.user.bio;
      this.address = data.user.address;
      this.facebook = data.user.facebook;
      this.twitter = data.user.twitter;
      this.instagram = data.user.instagram;
      this.linkedIn = data.user.linkedIn;
    }, error => {
      alert(error.message);
    })
  }

}
