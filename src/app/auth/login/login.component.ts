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
    emailOrPhone: "",
    password: ""
  };

  login(): void {
    if (!this.loginCommand.emailOrPhone) {
      alert("Enter valid email of password.");
      return;
    }

    if (!this.loginCommand.password) {
      alert("Enter valid password");
      return;
    }

    this.loginSub$ = this.authService.createSession(this.loginCommand).subscribe(data => {

      this.authService.writeAccessToken(data.accessToken);
      this.authService.writeRefreshToken(data.refreshToken);
      this.authService.writeUserId(data.userId);

      this.router.navigateByUrl('main').then(r => r);
    }, error => {
      alert(error.error.errorDetails);
    });
  }

  ngOnDestroy(): void {
  }
}
