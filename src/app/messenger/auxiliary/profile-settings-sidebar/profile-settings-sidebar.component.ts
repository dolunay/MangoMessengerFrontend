import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LogoutCommand} from "../../../../types/Auth/Requests/LogoutCommand";
import {Tokens} from "../../../../consts/Tokens";
import {ILogoutResponse} from "../../../../types/Auth/Responses/ILogoutResponse";
import {RefreshTokenCommand} from "../../../../types/Auth/Requests/RefreshTokenCommand";
import {LogoutAllCommand} from "../../../../types/Auth/Requests/LogoutAllCommand";

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
    this.authService.deleteSession(new LogoutCommand(localStorage.getItem(Tokens.refreshTokenId)))
      .subscribe((data: ILogoutResponse) => {
        this.router.navigateByUrl('login').then(r => r);
      }, error => {
        console.log(error);
        this.router.navigateByUrl('login').then(r => r);
      })
  }

  logoutAll(): void {
    this.authService.deleteAllSessions(new LogoutAllCommand(localStorage.getItem(Tokens.refreshTokenId)))
      .subscribe((data: ILogoutResponse) => {
        this.router.navigateByUrl('login').then(r => r);
      }, error => {
        console.log(error);
        this.router.navigateByUrl('login').then(r => r);
      })
  }

}
