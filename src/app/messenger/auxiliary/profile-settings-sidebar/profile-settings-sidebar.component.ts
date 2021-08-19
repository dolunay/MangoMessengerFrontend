import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ILogoutResponse} from "../../../../types/responses/ILogoutResponse";

@Component({
  selector: 'app-profile-settings-sidebar',
  templateUrl: './profile-settings-sidebar.component.html',
  styleUrls: ['./profile-settings-sidebar.component.scss']
})
export class ProfileSettingsSidebarComponent implements OnInit {

  constructor(private authService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    let refreshToken = this.authService.getRefreshToken();
    this.authService.deleteSession(refreshToken)
      .subscribe((data: ILogoutResponse) => {
        this.router.navigateByUrl('login').then(r => r);
      }, error => {
        console.log(error);
        this.router.navigateByUrl('login').then(r => r);
      })
  }

  logoutAll(): void {
    let refreshToken = this.authService.getRefreshToken();
    this.authService.deleteAllSessions(refreshToken)
      .subscribe((data: ILogoutResponse) => {
        this.router.navigateByUrl('login').then(r => r);
      }, error => {
        console.log(error);
        this.router.navigateByUrl('login').then(r => r);
      })
  }

}
