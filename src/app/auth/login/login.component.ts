import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {LoginCommand} from "../../../types/requests/LoginCommand";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {

  constructor(private authService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  protected loginSub$!: Subscription;

  public loginCommand: LoginCommand = {
    emailOrPhone: "kolosovp94@gmail.com",
    password: "z[?6dMR#xmp=nr6q"
  };

  login(): void {
    this.loginSub$ = this.authService.createSession(this.loginCommand).subscribe(data => {

        this.authService.writeAccessToken(data.accessToken);
        this.authService.writeRefreshToken(data.refreshToken);
        this.authService.writeUserId(data.userId);

        this.router.navigateByUrl('main').then(r => r);
      }, error => alert(error.error.ErrorMessage));
  }

  ngOnDestroy(): void {
  }
}
