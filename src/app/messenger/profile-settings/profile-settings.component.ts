import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {UpdateAccountInformationCommand} from "../../../types/requests/UpdateAccountInformationCommand";
import {ChangePasswordCommand} from "../../../types/requests/ChangePasswordCommand";
import {IUser} from "../../../types/models/IUser";
import {Subject, Subscription} from "rxjs";
import {UpdateUserSocialsCommand} from "../../../types/requests/UpdateUserSocialsCommand";
import {DocumentsService} from "../../services/documents.service";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {

  constructor(private userService: UsersService,
              private documentService: DocumentsService) {
  }

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  eventsSubject: Subject<IUser> = new Subject<IUser>();

  currentUser: IUser = {
    pictureUrl: "",
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

  cloneUser!: IUser;

  currentPassword = '';
  newPassword = '';
  repeatNewPassword = '';

  privateKey = 0;
  fileName = '';

  file!: File;

  ngOnInit(): void {
    this.initializeView();
  }

  emitEventToChild(user: IUser): void {
    this.eventsSubject.next(user);
  }

  initializeView(): void {
    let currentSub = this.userService.getCurrentUser().subscribe(getUserResponse => {
      this.currentUser = getUserResponse.user;
      this.currentPassword = '';
      this.newPassword = '';
      this.repeatNewPassword = '';
      this.privateKey = 0;
      this.cloneUser = (JSON.parse(JSON.stringify(this.currentUser)));
      this.emitEventToChild(this.cloneUser);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(currentSub);
  }

  saveAccountInfo(): void {
    const command = new UpdateAccountInformationCommand(
      this.currentUser.firstName,
      this.currentUser.lastName,
      this.currentUser.displayName,
      this.currentUser.phoneNumber.toString(),
      this.currentUser.birthdayDate,
      this.currentUser.email,
      this.currentUser.website,
      this.currentUser.username,
      this.currentUser.bio,
      this.currentUser.address);

    let updateSub = this.userService.updateUserAccountInformation(command).subscribe(response => {
      alert(response.message);
      this.cloneUser = (JSON.parse(JSON.stringify(this.currentUser)));
      this.emitEventToChild(this.cloneUser);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(updateSub);
  }

  saveSocialMediaInfo(): void {
    const command = new UpdateUserSocialsCommand(this.currentUser.facebook,
      this.currentUser.twitter,
      this.currentUser.instagram,
      this.currentUser.linkedIn);

    let socialsSub = this.userService.updateUserSocials(command).subscribe(response => {
      alert(response.message);
      this.cloneUser = (JSON.parse(JSON.stringify(this.currentUser)));
      this.emitEventToChild(this.cloneUser);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(socialsSub);
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
    let changeSub = this.userService.putChangePassword(command).subscribe(data => {
      alert(data.message);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(changeSub);
  }

  updateProfilePicture(): void {
    const formData = new FormData();
    formData.append("formFile", this.file);

    let docSub = this.documentService.uploadDocument(formData).subscribe(uploadResponse => {
      let profileSub = this.userService.updateProfilePicture(uploadResponse.fileName).subscribe(updateResponse => {
        console.log(uploadResponse);
        alert(updateResponse.message);
        this.currentUser.pictureUrl = uploadResponse.fileUrl;
        this.cloneUser = (JSON.parse(JSON.stringify(this.currentUser)));
        this.emitEventToChild(this.cloneUser);
      });

      this.subscriptions.push(profileSub);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(docSub);
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileName = file.name;
    }
  }
}
