import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {UsersService} from "../../services/users.service";
import {VerificationMethod} from "../../../types/enums/VerificationMethod";
import {RegisterCommand} from "../../../types/requests/RegisterCommand";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  phoneNumber = '';
  email = '';
  password = '';
  verificationMethod = VerificationMethod.Email;
  termsAccepted = false;
  displayName = '';

  verificationMethods = [VerificationMethod.Phone, VerificationMethod.Email];

  constructor(private usersService: UsersService, private sessionService: SessionService,
              private route: ActivatedRoute, private router: Router) {
  }

  register(): void {
    const verificationMethod = this.verificationMethod === VerificationMethod.Email ? 2 : 1;

    const command = new RegisterCommand(this.phoneNumber, this.email, this.displayName,
      this.password, verificationMethod, this.termsAccepted);

    this.usersService.postUser(command).subscribe((data) => {
      this.sessionService.writeAccessToken(data.accessToken);
      this.sessionService.writeRefreshToken(data.refreshToken);
      if (this.verificationMethod === VerificationMethod.Phone) {
        this.router.navigateByUrl('verify-phone').then(_ => alert(data.message));
        return;
      }

      this.initializeForm();
      alert('Mail is sent to the your inbox. Check and follow instructions.');
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }

  initializeForm(): void {
    this.phoneNumber = '';
    this.email = '';
    this.password = '';
    this.verificationMethod = VerificationMethod.Email;
    this.termsAccepted = false;
    this.displayName = '';
  }
}
