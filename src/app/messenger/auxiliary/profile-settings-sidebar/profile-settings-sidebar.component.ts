import {Component, Input, OnDestroy} from '@angular/core';
import {SessionService} from "../../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {IUser} from "../../../../types/models/IUser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile-settings-sidebar',
  templateUrl: './profile-settings-sidebar.component.html'
})
export class ProfileSettingsSidebarComponent implements OnDestroy {

  constructor(private sessionService: SessionService,
              private userService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  @Input() user!: IUser;
  @Input() phoneNumber!: string;
  subscriptions: Subscription[] = [];

  logout(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    let deleteSession = this.sessionService.deleteSession(refreshToken)
      .subscribe((_) => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      }, _ => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      });

    this.subscriptions.push(deleteSession);
  }

  logoutAll(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    let deleteAllSub = this.sessionService.deleteAllSessions(refreshToken)
      .subscribe((_) => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      }, _ => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      });

    this.subscriptions.push(deleteAllSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
