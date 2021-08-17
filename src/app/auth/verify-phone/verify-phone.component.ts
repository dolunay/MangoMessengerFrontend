import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IVerifyPhoneCodeResponse} from "../../../types/Auth/Responses/IVerifyPhoneCodeResponse";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {

  phoneCode!: number;
  verifyPhoneResponse!: IVerifyPhoneCodeResponse;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  verifyPhone(): void {
    this.authService.putPhoneConfirmation(this.phoneCode)
      .subscribe((data: IVerifyPhoneCodeResponse) => {
        this.verifyPhoneResponse = data;
        this.router.navigateByUrl('login').then(r => r);
      }, error => {

        if (error.error.title != undefined) {
          alert("invalid confirmation code");
        } else {
          alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " "));
        }

      });
  }
}
