import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {IRegisterResponse} from "../../../types/responses/IRegisterResponse";
import {UsersService} from "../../services/users.service";
import {VerificationMethod} from "../../../types/enums/VerificationMethod";
import {RegisterCommand} from "../../../types/requests/RegisterCommand";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  PhoneNumber = '+38097491385194';
  Email = 'bo4a.eburit@gmail.com';
  Password = 'z[?6dMR#xmp=nr6q';
  verificationMethod = VerificationMethod.Email;
  TermsAccepted = false;
  DisplayName = 'Bo4a Account';

  verificationMethods = [VerificationMethod.Phone, VerificationMethod.Email];

  constructor(private usersService: UsersService, private sessionService: SessionService,
              private route: ActivatedRoute, private router: Router) {
  }

  register(): void {
    const command = new RegisterCommand(this.PhoneNumber, this.Email, this.DisplayName,
      this.Password, Number(this.verificationMethod), this.TermsAccepted);

    this.usersService.postUser(command).subscribe((data: IRegisterResponse) => {
      this.sessionService.writeAccessToken(data.accessToken);
      this.sessionService.writeRefreshToken(data.refreshToken);
      this.router.navigateByUrl('verify-phone').then(r => alert(data.message));
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }
}
