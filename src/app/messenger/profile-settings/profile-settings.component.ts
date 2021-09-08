import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {UpdateAccountInformationCommand} from "../../../types/requests/UpdateAccountInformationCommand";
import {ChangePasswordCommand} from "../../../types/requests/ChangePasswordCommand";
import {IUser} from "../../../types/models/IUser";
import {Subject} from "rxjs";
import {CryptoService} from "../../services/crypto.service";
import {Tokens} from "../../../consts/Tokens";
import {RandomGeneratorService} from "../../services/random-generator.service";
import {UpdateUserSocialsCommand} from "../../../types/requests/UpdateUserSocialsCommand";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private userService: UsersService, private cryptoService: CryptoService,
              private randomGenerator: RandomGeneratorService) {
  }

  eventsSubject: Subject<void> = new Subject<void>();

  currentUser: IUser = {
    publicKey: 0,
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

  privateKey = 0;

  ngOnInit(): void {
    this.initializeView();
  }

  initializeView(): void {
    this.userService.getCurrentUser().subscribe(getUserResponse => {
      this.currentUser = getUserResponse.user;
      this.currentPassword = '';
      this.newPassword = '';
      this.repeatNewPassword = '';
      this.privateKey = 0;
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  saveAccountInfo(): void {
    const command = new UpdateAccountInformationCommand(
      this.currentUser.firstName,
      this.currentUser.lastName,
      this.currentUser.displayName,
      this.currentUser.phoneNumber,
      this.currentUser.birthdayDate,
      this.currentUser.email,
      this.currentUser.website,
      this.currentUser.username,
      this.currentUser.bio,
      this.currentUser.address);

    this.userService.updateUserAccountInformation(command).subscribe(response => {
      alert(response.message);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  saveSocialMediaInfo(): void {
    const command = new UpdateUserSocialsCommand(this.currentUser.facebook,
      this.currentUser.twitter,
      this.currentUser.instagram,
      this.currentUser.linkedIn);

    this.userService.updateUserSocials(command).subscribe(response => {
      alert(response.message);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  changePassword(): void {
    if (this.currentPassword === this.newPassword) {
      alert("New password should not equals current password");
      return;
    }

    if (this.newPassword !== this.repeatNewPassword) {
      alert('Passwords are different.');
      return;
    }

    const command = new ChangePasswordCommand(this.currentPassword, this.newPassword);
    this.userService.putChangePassword(command).subscribe(data => {
      alert(data.message);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  updatePublicKey(): void {
    const base = Tokens.base;
    const modulus = Tokens.modulus;
    const privateKey: number = this.randomGenerator.getRandomInt(1, 30);
    const newPubicKey: number = Math.pow(base, privateKey) % modulus;
    this.cryptoService.updatePublicKey(newPubicKey).subscribe(data => {
      this.cryptoService.writeSecretKey(privateKey.toString());
      this.initializeView();
      alert(data.message);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
