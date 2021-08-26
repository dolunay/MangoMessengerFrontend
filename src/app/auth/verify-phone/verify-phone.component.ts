import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {SessionService} from "../../services/session.service";
import {ITokensResponse} from "../../../types/responses/ITokensResponse";

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent {

  phoneCode!: number;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router,
              private sessionService: SessionService) {
  }

  verifyPhone(): void {
    this.usersService.putPhoneConfirmation(this.phoneCode).subscribe((data) => {
      const refreshToken = this.sessionService.getRefreshToken();
      this.sessionService.postRefreshSession(refreshToken).subscribe((data: ITokensResponse) => {
        this.sessionService.writeAccessToken(data.accessToken);
        this.sessionService.writeRefreshToken(data.refreshToken);
      }, error => {
        this.router.navigateByUrl('login').then(_ => alert(error.error.ErrorMessage));
      })

      this.sessionService.writeActiveChatId('');
      this.router.navigateByUrl('main').then(_ => alert(data.message));
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }
}
