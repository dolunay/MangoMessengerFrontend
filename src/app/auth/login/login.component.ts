import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ILoginResponse} from "../../../types/Auth/Responses/ILoginResponse";
import {LoginCommand} from "../../../types/Auth/Requests/LoginCommand";
import {Tokens} from "../../../consts/Tokens";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = 'kolosovp94@gmail.com';
  password = 'z[?6dMR#xmp=nr6q';
  loginResponse!: ILoginResponse;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  login(): void {
    this.authService.postSession(new LoginCommand(this.email, this.password)).subscribe((data: ILoginResponse) => {
      this.loginResponse = data;

      if (!this.loginResponse.success) {
        // to implement redirect
        this.router.navigateByUrl('register').then(r => r);
        return;
      }

      localStorage.setItem(Tokens.accessToken, this.loginResponse.accessToken);
      localStorage.setItem(Tokens.refreshTokenId, this.loginResponse.refreshTokenId);
      this.router.navigateByUrl('main').then(r => r);
    }, error => alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " ")));
  }

  ngOnInit(): void {
  }

}
