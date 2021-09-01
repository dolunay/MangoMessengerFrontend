import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html'
})
export class VerifyPhoneComponent {

  phoneCode!: number;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router,
              private sessionService: SessionService) {
  }

  verifyPhone(): void {
    this.usersService.putPhoneConfirmation(this.phoneCode).subscribe((phoneConfirmResponse) => {
      const refreshToken = this.sessionService.getRefreshToken();
      this.sessionService.postRefreshSession(refreshToken).subscribe((refreshTokenResponse) => {
        this.sessionService.writeAccessToken(refreshTokenResponse.accessToken);
        this.sessionService.writeRefreshToken(refreshTokenResponse.refreshToken);
      }, error => {
        this.router.navigateByUrl('login').then(_ => alert(error.error.ErrorMessage));
      })

      this.router.navigateByUrl('start').then(_ => alert(phoneConfirmResponse.message));
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }
}
