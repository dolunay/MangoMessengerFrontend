import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ILoginResponse} from "../../../types/Auth/Responses/ILoginResponse";
import {LoginCommand} from "../../../types/Auth/Requests/LoginCommand";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  login(): void {
    this.authService.postSession(new LoginCommand(this.email, this.password)).subscribe((data: ILoginResponse) => {
      this.authService.writeAccessToken(data.accessToken);
      this.authService.writeRefreshToken(data.refreshToken);
      this.router.navigateByUrl('main').then(r => r);
    }, error => alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " ")));
  }
}
