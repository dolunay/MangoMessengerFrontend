import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyEmailCommand} from "../../../types/requests/VerifyEmailCommand";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private sessionService: SessionService, private route: ActivatedRoute,
              private router: Router, private usersService: UsersService) {
  }

  success = false;
  message = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      const email = params['email'];
      const refreshToken = this.sessionService.getRefreshToken();
      this.usersService.putEmailConfirmation(new VerifyEmailCommand(email, userId))
        .subscribe((_) => {
          this.success = true;
          this.sessionService.postRefreshSession(refreshToken).subscribe(result => {
            this.sessionService.writeRefreshToken(result.refreshToken);
            this.sessionService.writeAccessToken(result.accessToken);
            this.sessionService.writeActiveChatId('');
          })
        }, error => {
          this.message = error.error.ErrorMessage;
          alert(error.error.ErrorMessage);
        });
    });
  }

  proceedToMain(): void {
    this.router.navigateByUrl('main').then(_ => _);
  }
}
