import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IVerifyPhoneCodeResponse} from "../../../types/Auth/Responses/IVerifyPhoneCodeResponse";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent {

  phoneCode!: number;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  verifyPhone(): void {
    this.authService.putPhoneConfirmation(this.phoneCode).subscribe((data: IVerifyPhoneCodeResponse) => {
        this.router.navigateByUrl('login').then(r => alert(data.message));
      }, error => {
        alert(error.error.ErrorMessage);
      });
  }
}
