import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {LoginCommand} from "../../../types/requests/LoginCommand";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: SessionService, private route: ActivatedRoute, private router: Router) {
  }

  login(): void {
    this.authService.postSession(new LoginCommand(this.email, this.password)).subscribe((data) => {
      this.authService.writeAccessToken(data.accessToken);
      this.authService.writeRefreshToken(data.refreshToken);
      this.router.navigateByUrl('main').then(r => r);
    }, error => alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " ")));
  }
}
