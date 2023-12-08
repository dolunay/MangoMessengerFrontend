import { ValidationService } from '../../services/validation.service';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {UsersService} from "../../services/users.service";
import {RegisterCommand} from "../../../types/requests/RegisterCommand";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {ErrorNotificationService} from "../../services/error-notification.service";

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
    termsAccepted: false,
  };

  protected registerSub$!: Subscription;

  constructor(private usersService: UsersService,
              private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private errorNotificationService: ErrorNotificationService,
              private validationService: ValidationService) {
  }

  register(): void {

    this.validationService.validateField(this.registerCommand.email, 'Email');
    this.validationService.validateField(this.registerCommand.displayName, 'Display Name');
    this.validationService.validateField(this.registerCommand.password, 'Password');

    if (!this.registerCommand.termsAccepted) {
      alert("Terms of service must be accepted.");
      return;
    }

    this.registerSub$ = this.usersService.createUser(this.registerCommand).subscribe(_ => {
      this.router.navigateByUrl('verify-email-note').then(r => r);
    }, error => {
      this.errorNotificationService.notifyOnError(error);
    });
  }

  ngOnDestroy(): void {
  }
}
