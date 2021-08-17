import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ILogoutResponse} from "../../../../types/Auth/Responses/ILogoutResponse";

@Component({
  selector: 'app-profile-settings-sidebar',
  templateUrl: './profile-settings-sidebar.component.html',
  styleUrls: ['./profile-settings-sidebar.component.scss']
})
export class ProfileSettingsSidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    let refreshToken = this.authService.getRefreshTokenId();
    this.authService.deleteSession(refreshToken)
      .subscribe((data: ILogoutResponse) => {
        this.router.navigateByUrl('login').then(r => r);
      }, error => {
        console.log(error);
        this.router.navigateByUrl('login').then(r => r);
      })
  }

  logoutAll(): void {
    let refreshToken = this.authService.getRefreshTokenId();
    this.authService.deleteAllSessions(refreshToken)
      .subscribe((data: ILogoutResponse) => {
        this.router.navigateByUrl('login').then(r => r);
      }, error => {
        console.log(error);
        this.router.navigateByUrl('login').then(r => r);
      })
  }

}
