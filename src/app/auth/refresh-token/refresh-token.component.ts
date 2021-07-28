import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Tokens} from "../../../consts/Tokens";
import {RefreshTokenCommand} from "../../../types/Auth/Requests/RefreshTokenCommand";
import {IRefreshTokenResponse} from "../../../types/Auth/Responses/IRefreshTokenResponse";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-refresh-token',
  templateUrl: './refresh-token.component.html',
  styleUrls: ['./refresh-token.component.scss']
})
export class RefreshTokenComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  refreshToken(): void {
    let refreshToken = localStorage.getItem(Tokens.refreshTokenId);
    console.log(refreshToken);
    let command = new RefreshTokenCommand(refreshToken);
    console.log(command);
    this.authService.refreshToken(new RefreshTokenCommand(refreshToken)).subscribe(
      (data: IRefreshTokenResponse) => {
        if (data.success) {
          localStorage.setItem(Tokens.accessToken, data.accessToken);
          localStorage.setItem(Tokens.refreshTokenId, data.refreshTokenId);
          return;
        }
        this.router.navigateByUrl('login').then(r => r);
      }, error => alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " ")) );
  }

}
