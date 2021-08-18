import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Tokens} from "../../../consts/Tokens";
import {AuthService} from "../../services/auth.service";
import {RefreshTokenCommand} from "../../../types/requests/RefreshTokenCommand";
import {IRefreshTokenResponse} from "../../../types/responses/IRefreshTokenResponse";

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
    let refreshToken = localStorage.getItem(Tokens.refreshToken);
    console.log(refreshToken);
    let command = new RefreshTokenCommand(refreshToken);
    console.log(command);
    this.authService.postRefreshSession(refreshToken).subscribe((data: IRefreshTokenResponse) => {
        if (data.success) {
          localStorage.setItem(Tokens.accessToken, data.accessToken);
          localStorage.setItem(Tokens.refreshToken, data.refreshToken);
          return;
        }
        this.router.navigateByUrl('login').then(r => r);
      }, error => alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " ")) );
  }

}
