import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyEmailCommand} from "../../../types/requests/VerifyEmailCommand";
import {UsersService} from "../../services/users.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {

  constructor(private sessionService: SessionService, private route: ActivatedRoute,
              private router: Router, private usersService: UsersService) {
  }

  success = false;
  message = '';
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const emailCode = params['emailCode'];
      const email = params['email'];
      let putSubscribe = this.usersService.putEmailConfirmation(new VerifyEmailCommand(email, emailCode))
        .subscribe(data => {
          this.success = data.success;

        }, error => {
          this.message = error.error.ErrorMessage;
          alert(error.error.ErrorMessage);
        });

      this.subscriptions.push(putSubscribe);
    });
  }

  proceedToStart(): void {
    const refreshToken = this.sessionService.getRefreshToken();
    let refreshSub = this.sessionService.postRefreshSession(refreshToken).subscribe(result => {
      this.sessionService.writeRefreshToken(result.refreshToken);
      this.sessionService.writeAccessToken(result.accessToken);
      this.sessionService.writeUserId(result.userId);
      this.router.navigateByUrl('start').then(_ => _);
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(refreshSub);
  }
}
