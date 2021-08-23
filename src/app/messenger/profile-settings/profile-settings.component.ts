import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {IGetUserResponse} from "../../../types/responses/IGetUserResponse";
import {UpdateUserInformationCommand} from "../../../types/requests/UpdateUserInformationCommand";
import {ChangePasswordCommand} from "../../../types/requests/ChangePasswordCommand";
import {IUser} from "../../../types/models/IUser";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  currentUser: IUser = {
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

  currentPassword = '';
  newPassword = '';
  repeatNewPassword = '';

  ngOnInit(): void {
    this.initializeView();
  };

  initializeView(): void {
    this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
      this.currentUser = data.user;
      this.currentPassword = '';
      this.newPassword = '';
      this.repeatNewPassword = '';
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  saveAccountInfo(): void {
    const command = new UpdateUserInformationCommand(this.currentUser.firstName,
      this.currentUser.lastName,
      this.currentUser.displayName,
      this.currentUser.phoneNumber,
      this.currentUser.birthdayDate,
      this.currentUser.email,
      this.currentUser.username,
      this.currentUser.bio,
      this.currentUser.address);

    command.website = this.currentUser.website;

    this.userService.putUpdateUserInformation(command).subscribe((data) => {
      this.initializeView();
      alert(data.message);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  };

  saveSocialMediaInfo(): void {
    const command = UpdateUserInformationCommand.CreateEmptyCommand();
    command.facebook = this.currentUser.facebook;
    command.twitter = this.currentUser.twitter;
    command.instagram = this.currentUser.instagram;
    command.linkedIn = this.currentUser.linkedIn;

    this.userService.putUpdateUserInformation(command).subscribe((_) => {

    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  changePassword(): void {
    if (this.newPassword !== this.repeatNewPassword) {
      alert('Passwords are different.');
      return;
    }

    const command = new ChangePasswordCommand(this.currentPassword, this.newPassword);
    this.userService.putChangePassword(command).subscribe((_) => {
      alert('Password changed OK.');
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

}
