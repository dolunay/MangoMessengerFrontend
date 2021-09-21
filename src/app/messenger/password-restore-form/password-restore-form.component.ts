import {Component, OnInit} from '@angular/core';
import {ResetPasswordRequest} from "../../../types/requests/ResetPasswordRequest";
import {PasswordResetService} from "../../services/password-reset.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-password-restore-form',
  templateUrl: './password-restore-form.component.html',
  styleUrls: ['./password-restore-form.component.scss']
})
export class PasswordRestoreFormComponent {

  newPassword = '';
  repeatPassword = '';
  requestId: string | null = '';

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
    console.log(requestId);
    const command = new ResetPasswordRequest(requestId, this.newPassword, this.repeatPassword);

    this.passwordResetService.resetPassword(command).subscribe(_ => {
      alert('Password reset success.')
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }
}
