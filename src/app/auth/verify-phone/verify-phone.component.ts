import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {SessionService} from "../../services/session.service";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html'
})
export class VerifyPhoneComponent implements OnDestroy {

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService) {
  }

  public phoneCode!: number;
  protected confirmPhoneSub$!: Subscription;
  protected refreshTokenSub$!: Subscription;

  verifyPhone(): void {
    this.confirmPhoneSub$ = this.usersService.confirmPhone(this.phoneCode).subscribe(confirm => {

      const refreshToken = this.sessionService.getRefreshToken();

      this.refreshTokenSub$ = this.sessionService.refreshSession(refreshToken).subscribe(refresh => {

        this.sessionService.writeAccessToken(refresh.accessToken);
        this.sessionService.writeRefreshToken(refresh.refreshToken);
        this.sessionService.writeUserId(refresh.userId);
        this.router.navigateByUrl('main').then(() => alert(confirm.message));

      });
    }, error => alert(error.error.ErrorMessage));
  }

  ngOnDestroy(): void {
  }
}
