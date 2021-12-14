import {Component, OnDestroy} from '@angular/core';
import {ResetPasswordRequest} from "../../../types/requests/ResetPasswordRequest";
import {PasswordResetService} from "../../services/password-reset.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-password-restore-form',
  templateUrl: './password-restore-form.component.html'
})
export class PasswordRestoreFormComponent implements OnDestroy {

  protected passwordChangeSub$!: Subscription;

  public newPassword = '';
  public repeatPassword = '';
  public requestId: string | null = '';


  constructor(private passwordResetService: PasswordResetService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  restorePassword(): void {
    if (this.newPassword !== this.repeatPassword) {
      alert('Passwords are not same');
      return;
    }

    const requestId = this.route.snapshot.queryParamMap.get('requestId');

    if (requestId == null) {
      alert('Wrong password change request ID.');
      return;
    }

    const command = new ResetPasswordRequest(requestId, this.newPassword, this.repeatPassword);

    this.passwordChangeSub$ =
      this.passwordResetService.resetPassword(command).subscribe(_ =>
          this.router.navigateByUrl('login').then(() => alert('Password reset success.')),
        error => alert(error.error.errorDetails));
  }

  ngOnDestroy(): void {
  }
}
