import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {LoginCommand} from "../../../types/requests/LoginCommand";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {

  emailOrPhone = 'kolosovp94@gmail.com';
  password = 'z[?6dMR#xmp=nr6q';

  subscriptions: Subscription[] = [];

  constructor(private authService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  login(): void {
    let loginSub = this.authService.postSession(new LoginCommand(this.emailOrPhone, this.password))
      .subscribe(data => {
        this.authService.writeAccessToken(data.accessToken);
        this.authService.writeRefreshToken(data.refreshToken);
        this.authService.writeUserId(data.userId);
        console.log(data);
        this.router.navigateByUrl('main').then(r => r);
      }, error => {
        alert(error.error.ErrorMessage)
      });

    this.subscriptions.push(loginSub);
  }
}
