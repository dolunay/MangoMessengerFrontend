import {Component, OnDestroy} from '@angular/core';
import {ResetPasswordRequest} from "../../../types/requests/ResetPasswordRequest";
import {PasswordResetService} from "../../services/password-reset.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-password-restore-form',
  templateUrl: './password-restore-form.component.html',
  styleUrls: ['./password-restore-form.component.scss']
})
export class PasswordRestoreFormComponent implements OnDestroy {

  newPassword = '';
  repeatPassword = '';
  requestId: string | null = '';

  subscriptions: Subscription[] = [];

  constructor(private passwordResetService: PasswordResetService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  restorePassword(): void {
    if (this.newPassword !== this.repeatPassword) {
      alert('Passwords are not same');
      return;
    }

    const requestId = this.route.snapshot.queryParamMap.get('requestId');
    const command = new ResetPasswordRequest(requestId, this.newPassword, this.repeatPassword);

    let passwordSub = this.passwordResetService.resetPassword(command).subscribe(_ => {
      alert('Password reset success.')
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(passwordSub);
  }
}
