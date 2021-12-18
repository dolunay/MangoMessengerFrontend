import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyEmailCommand} from "../../../types/requests/VerifyEmailCommand";
import {UsersService} from "../../services/users.service";
import {Subscription} from "rxjs";
import {IBaseResponse} from "../../../types/responses/IBaseResponse";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private usersService: UsersService) {
  }

  public response: IBaseResponse = {
    message: "",
    success: false
  };

  public isLoaded = false;
  public errorMessage = '';

  protected routeSub$!: Subscription;
  protected confirmEmailSub$!: Subscription;
  protected refreshSessionSub$!: Subscription;

  ngOnInit(): void {
    this.routeSub$ = this.route.queryParams.subscribe(params => {
      const emailCode = params['emailCode'];
      const email = params['email'];
      const command = new VerifyEmailCommand(email, emailCode);

      if (!emailCode || !email) {
        alert("Invalid request.");
        return;
      }

      this.confirmEmailSub$ = this.usersService.confirmEmail(command).subscribe(result => {
        this.response = result;
      }, error => {
        alert(error.error.errorDetails);
      });
    });
  }

  proceedToMainComponent(): void {
    const refreshToken = this.sessionService.getRefreshToken();

    this.refreshSessionSub$ = this.sessionService.refreshSession(refreshToken).subscribe(result => {
      this.sessionService.writeRefreshToken(result.refreshToken);
      this.sessionService.writeAccessToken(result.accessToken);
      this.sessionService.writeUserId(result.userId);

      this.router.navigateByUrl('main').then(r => r);

    }, error => alert(error.error.errorDetails));
  }

  ngOnDestroy(): void {
  }
}
