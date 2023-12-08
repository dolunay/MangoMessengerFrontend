import {Component, OnInit, inject, DestroyRef} from '@angular/core';
import { UsersService} from "@core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";
import {IBaseResponse} from "@types/responses";
import {VerifyEmailCommand} from "@types/requests";




@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  standalone: true
})
export class VerifyEmailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly usersService = inject(UsersService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly emailCode = toSignal(this.route.queryParamMap.pipe(map( query => query.get('emailCode') as string)), {initialValue: ''})
  private readonly email = toSignal(this.route.queryParamMap.pipe(map( query => query.get('emailCode') as string)), {initialValue: ''})

  response: IBaseResponse = {
    message: "",
    success: false
  };

  errorMessage = '';

  ngOnInit(): void {
      const command = new VerifyEmailCommand(this.email(), this.emailCode());

      if (!this.email() || !this.emailCode()) {
        alert("Invalid or expired activation link.");
        return;
      }

      this.usersService.confirmEmail(command).pipe(
          takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (result) => this.response = result,
        error: () => this.errorMessage + "Invalid or expired activation link."
      });
  }

  async proceedToLoginComponent(): Promise<void> {
    await this.router.navigateByUrl('login')
  }

}
