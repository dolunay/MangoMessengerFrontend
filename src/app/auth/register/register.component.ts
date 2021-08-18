import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VerificationMethod} from 'src/types/Auth/Enums/VerificationMethod';
import {IRegisterResponse} from "../../../types/Auth/Responses/IRegisterResponse";
import {RegisterCommand} from "../../../types/Auth/Requests/RegisterCommand";
import {AuthService} from "../../services/auth.service";

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

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  register(): void {
    this.authService.postUser(new RegisterCommand(
      this.PhoneNumber,
      this.Email,
      this.DisplayName,
      this.Password,
      Number(this.verificationMethod),
      this.TermsAccepted)).subscribe((data: IRegisterResponse) => {
      this.authService.writeAccessToken(data.accessToken);
      this.authService.writeRefreshToken(data.refreshToken);

      if (this.verificationMethod === VerificationMethod.Email) {
        alert(data.message.toLowerCase().replace("_", " "));
        return;
      }

      this.router.navigateByUrl('verify-phone').then(r => r);
    }, error => alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " ")));
  }
}
