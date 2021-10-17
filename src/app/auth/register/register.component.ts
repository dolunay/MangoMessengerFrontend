import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {UsersService} from "../../services/users.service";
import {RegisterCommand} from "../../../types/requests/RegisterCommand";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnDestroy {

  public registerCommand: RegisterCommand = {
    displayName: "Bo4a Account",
    email: "kolosovp94@gmail.com",
    password: "z[?6dMR#xmp=nr6q",
    phoneNumber: "380974913851980",
    termsAccepted: false,
    verificationMethod: 2
  };

  protected registerSub$!: Subscription;

  constructor(private usersService: UsersService,
              private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  register(): void {
    this.registerSub$ = this.usersService.createUser(this.registerCommand).subscribe(registerResponse => {
      this.sessionService.writeAccessToken(registerResponse.accessToken);
      this.sessionService.writeRefreshToken(registerResponse.refreshToken);
      this.sessionService.writeUserId(registerResponse.userId);
      this.router.navigateByUrl('verify-email-note').then(r => r);
    }, error => alert(error.error.ErrorMessage));
  }

  ngOnDestroy(): void {
  }
}
