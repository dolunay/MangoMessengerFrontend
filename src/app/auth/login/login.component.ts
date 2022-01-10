import { ValidationService } from './../../services/validation.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {LoginCommand} from "../../../types/requests/LoginCommand";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {ErrorNotificationService} from "../../services/error-notification.service";

@AutoUnsubscribe()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy, OnInit {

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private errorNotificationService: ErrorNotificationService,
              private validationService: ValidationService) {
  }

  protected loginSub$!: Subscription;

  public loginCommand: LoginCommand = {
    email: "",
    password: ""
  };

  login(): void {
    this.validationService.validateField(this.loginCommand.email, 'Email');
    this.validationService.validateField(this.loginCommand.password, 'Password');

    this.loginSub$ = this.sessionService.createSession(this.loginCommand).subscribe(response => {

      this.sessionService.setTokens(response.tokens);

      this.router.navigateByUrl('main').then(r => r);
    }, error => {
      this.errorNotificationService.notifyOnError(error);
    });
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.sessionService.clearTokens();
  }
}
