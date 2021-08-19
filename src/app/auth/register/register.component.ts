import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {RegisterCommand} from "../../../types/requests/RegisterCommand";
import {IRegisterResponse} from "../../../types/responses/IRegisterResponse";
import {VerificationMethod} from "../../../types/enums/VerificationMethod";
import {UsersService} from "../../services/users.service";

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
    this.usersService.postUser(new RegisterCommand(
      this.PhoneNumber,
      this.Email,
      this.DisplayName,
      this.Password,
      Number(this.verificationMethod),
      this.TermsAccepted)).subscribe((data: IRegisterResponse) => {
      this.sessionService.writeAccessToken(data.accessToken);
      this.sessionService.writeRefreshToken(data.refreshToken);

      if (this.verificationMethod === VerificationMethod.Email) {
        alert(data.message.toLowerCase().replace("_", " "));
        return;
      }

      this.router.navigateByUrl('verify-phone').then(r => r);
    }, error => alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " ")));
  }
}
