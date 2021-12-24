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
    displayName: "",
    email: "",
    password: "",
    phoneNumber: "",
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
    if (!this.registerCommand.displayName) {
      alert("Display name must not be empty.");
      return;
    }

    if (!this.registerCommand.email) {
      alert("Email must not be empty.");
      return;
    }

    if (!this.registerCommand.password) {
      alert("Password must not be empty.");
      return;
    }

    if (!this.registerCommand.phoneNumber) {
      alert("Phone number must not be empty.");
      return;
    }

    if (!this.registerCommand.termsAccepted) {
      alert("Terms of service must be accepted.");
      return;
    }

    this.registerSub$ = this.usersService.createUser(this.registerCommand).subscribe(registerResponse => {
      this.sessionService.writeAccessToken(registerResponse.accessToken);
      this.sessionService.writeRefreshToken(registerResponse.refreshToken);
      this.sessionService.writeUserId(registerResponse.userId);
      this.router.navigateByUrl('verify-email-note').then(r => r);
    }, error => alert(error.error.errorDetails));
  }

  ngOnDestroy(): void {
  }
}
