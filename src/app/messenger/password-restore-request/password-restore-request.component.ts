import {Component, OnDestroy} from '@angular/core';
import {PasswordResetService} from "../../services/password-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-password-restore-request',
  templateUrl: './password-restore-request.component.html',
  styleUrls: ['./password-restore-request.component.scss']
})
export class PasswordRestoreRequestComponent implements OnDestroy {
  phoneOrEmail = '';

  subscriptions: Subscription[] = [];

  constructor(private passwordResetService: PasswordResetService) {
  }

  sendPasswordRestoreRequest(): void {
    if (!this.phoneOrEmail) {
      alert('Empty email or phone not allowed.');
      return;
    }

    let sendPassSub = this.passwordResetService.sendPasswordResetRequest(this.phoneOrEmail)
      .subscribe(data => {
        this.phoneOrEmail = '';
        alert(data.message);
      }, error => {
        alert(error.error.ErrorMessage);
      });

    this.subscriptions.push(sendPassSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
