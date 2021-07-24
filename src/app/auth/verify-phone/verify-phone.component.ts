import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IVerifyPhoneCodeResponse} from "../../../types/Auth/Responses/IVerifyPhoneCodeResponse";
import {VerifyPhoneCommand} from 'src/types/Auth/Requests/VerifyPhoneCommand';
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
    this.authService.verifyPhone(new VerifyPhoneCommand(this.phoneCode))
      .subscribe((data: IVerifyPhoneCodeResponse) => {
        this.verifyPhoneResponse = data;

        console.log(this.verifyPhoneResponse);

        if (!this.verifyPhoneResponse.success) {
          // to implement
          console.log(this.verifyPhoneResponse.message);
          return;
        }

        this.router.navigateByUrl('login').then(r => r);
      });
  }

}
