import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService, UsersService} from "@core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyEmailCommand} from "@types/requests";
import {Subscription} from "rxjs";
import {IBaseResponse} from "@types/responses";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {inject} from "@angular/core/testing";

@AutoUnsubscribe()
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  standalone: true
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  private readonly sessionService = inject(SessionService);


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

  ngOnInit(): void {
    this.routeSub$ = this.route.queryParams.subscribe(params => {
      const emailCode = params['emailCode'];
      const email = params['email'];
      const command = new VerifyEmailCommand(email, emailCode);

      if (!emailCode || !email) {
        alert("Invalid or expired activation link.");
        return;
      }

      this.confirmEmailSub$ = this.usersService.confirmEmail(command).subscribe({
        next: (result) =>
      }result =>
          this.response = result,
        _ => this.errorMessage = "Invalid or expired activation link.");
    });
  }

  proceedToLoginComponent(): void {
    this.router.navigateByUrl('login').then(r => r);
  }

  ngOnDestroy(): void {
  }
}
