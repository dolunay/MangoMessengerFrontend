import {Component, Input} from '@angular/core';
import {SessionService} from "../../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {IUser} from "../../../../types/models/IUser";

@Component({
  selector: 'app-profile-settings-sidebar',
  templateUrl: './profile-settings-sidebar.component.html'
})
export class ProfileSettingsSidebarComponent {

  constructor(private sessionService: SessionService,
              private userService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  @Input() user!: IUser;

  logout(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    this.sessionService.deleteSession(refreshToken)
      .subscribe((_) => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      }, _ => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      })
  }

  logoutAll(): void {
    let refreshToken = this.sessionService.getRefreshToken();
    this.sessionService.deleteAllSessions(refreshToken)
      .subscribe((_) => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      }, _ => {
        this.sessionService.clearAccessToken();
        this.sessionService.clearRefreshToken();
        this.router.navigateByUrl('login').then(r => r);
      })
  }

}
