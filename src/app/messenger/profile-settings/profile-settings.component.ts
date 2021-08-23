import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {IGetUserResponse} from "../../../types/responses/IGetUserResponse";
import {UpdateUserInformationCommand} from "../../../types/requests/UpdateUserInformationCommand";
import {ChangePasswordCommand} from "../../../types/requests/ChangePasswordCommand";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  firstName: string = '';
  lastName: string = '';
  displayName: string = '';
  phoneNumber: string = '';
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
  currentPassword = '';
  newPassword = '';
  repeatNewPassword = '';

  ngOnInit(): void {
    this.initializeView();
  };

  initializeView(): void {
    this.userService.getCurrentUser().subscribe((data: IGetUserResponse) => {
      this.firstName = data.user.firstName;
      this.lastName = data.user.lastName;
      this.displayName = data.user.displayName;
      this.phoneNumber = data.user.phoneNumber;
      this.birthdayDate = data.user.birthdayDate;
      this.email = data.user.email;
      this.website = data.user.website;
      this.username = data.user.username;
      this.bio = data.user.bio;
      this.address = data.user.address;
      this.facebook = data.user.facebook;
      this.twitter = data.user.twitter;
      this.instagram = data.user.instagram;
      this.linkedIn = data.user.linkedIn;
      this.currentPassword = '';
      this.newPassword = '';
      this.repeatNewPassword = '';
    }, error => {
      alert(error.message);
    })
  }

  saveAccountInfo(): void {
    const command = new UpdateUserInformationCommand(this.firstName,
      this.lastName,
      this.displayName,
      this.phoneNumber,
      this.birthdayDate,
      this.email,
      this.username,
      this.bio,
      this.address);

    command.website = this.website;

    this.userService.putUpdateUserInformation(command).subscribe((_) => {

    }, error => {
      alert(error.message);
    })
  };

  saveSocialMediaInfo(): void {
    const command = UpdateUserInformationCommand.CreateEmptyCommand();
    command.facebook = this.facebook;
    command.twitter = this.twitter;
    command.instagram = this.instagram;
    command.linkedIn = this.linkedIn;

    this.userService.putUpdateUserInformation(command).subscribe((_) => {

    }, error => {
      alert(error.message);
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
