import {Component, OnDestroy} from '@angular/core';
import {PasswordResetService} from "../../services/password-reset.service";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-password-restore-request',
  templateUrl: './password-restore-request.component.html',
  styleUrls: ['./password-restore-request.component.scss']
})
export class PasswordRestoreRequestComponent implements OnDestroy {

  protected resetPasswordSub$!: Subscription;

  public phoneOrEmail = '';

  constructor(private passwordResetService: PasswordResetService) {
  }

  sendPasswordRestoreRequest(): void {
    if (!this.phoneOrEmail) {
      alert('Empty email or phone not allowed.');
      return;
    }

    this.resetPasswordSub$ = this.passwordResetService.sendPasswordResetRequest(this.phoneOrEmail)
      .subscribe(data => {
        this.phoneOrEmail = '';
        alert(data.message);
      }, error => alert(error.error.ErrorMessage));
  }

  ngOnDestroy(): void {
  }
}
