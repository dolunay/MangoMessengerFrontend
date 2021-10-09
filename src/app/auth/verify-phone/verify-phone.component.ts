import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {SessionService} from "../../services/session.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html'
})
export class VerifyPhoneComponent implements OnDestroy {

  phoneCode!: number;
  subscriptions: Subscription[] = [];

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  verifyPhone(): void {
    let phoneSub = this.usersService.putPhoneConfirmation(this.phoneCode).subscribe(_ => {
      const refreshToken = this.sessionService.getRefreshToken();
      let refreshSub = this.sessionService.postRefreshSession(refreshToken).subscribe(refreshResp => {
        this.sessionService.writeAccessToken(refreshResp.accessToken);
        this.sessionService.writeRefreshToken(refreshResp.refreshToken);
        this.subscriptions.push(refreshSub);
      });
      this.subscriptions.push(phoneSub);
      this.router.navigateByUrl('start').then(r => r);
    }, error => {
      alert(error.error.ErrorMessage);
    });
  }
}
