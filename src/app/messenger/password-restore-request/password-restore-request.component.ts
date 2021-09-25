import {Component} from '@angular/core';
import {PasswordResetService} from "../../services/password-reset.service";

@Component({
  selector: 'app-password-restore-request',
  templateUrl: './password-restore-request.component.html',
  styleUrls: ['./password-restore-request.component.scss']
})
export class PasswordRestoreRequestComponent {
  phoneOrEmail = '';

  constructor(private passwordResetService: PasswordResetService) {
  }

  sendPasswordRestoreRequest(): void {
    if (!this.phoneOrEmail) {
      alert('Empty email or phone not allowed.');
      return;
    }

    this.passwordResetService.sendPasswordResetRequest(this.phoneOrEmail).subscribe(data => {
      this.phoneOrEmail = '';
      alert(data.message);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
