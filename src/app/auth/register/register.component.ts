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

  PhoneNumber = '';
  Email = '';
  Password = '';
  verificationMethod = VerificationMethod.Email;
  TermsAccepted = false;
  DisplayName = '';

  verificationMethods = [VerificationMethod.Phone, VerificationMethod.Email];

  constructor(private usersService: UsersService, private sessionService: SessionService,
              private route: ActivatedRoute, private router: Router) {
  }

  register(): void {
    const command = new RegisterCommand(this.PhoneNumber, this.Email, this.DisplayName,
      this.Password, Number(this.verificationMethod), this.TermsAccepted);

    this.usersService.postUser(command).subscribe((data) => {
      this.sessionService.writeAccessToken(data.accessToken);
      this.sessionService.writeRefreshToken(data.refreshToken);
      if (this.verificationMethod === VerificationMethod.Phone) {
        this.router.navigateByUrl('verify-phone').then(r => alert(data.message));
        return;
      }

      alert('Confirm your email');
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }
}
