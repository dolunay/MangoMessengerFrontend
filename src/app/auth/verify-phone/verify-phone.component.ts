import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IVerifyPhoneCodeResponse} from "../../../types/Auth/Responses/IVerifyPhoneCodeResponse";
import {VerifyPhoneCommand} from 'src/types/Auth/Requests/VerifyPhoneCommand';
import {AuthService} from "../../services/auth.service";
import {Tokens} from "../../../consts/Tokens";

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
    let userId = localStorage.getItem(Tokens.userId);
    this.authService.putPhoneConfirmation(new VerifyPhoneCommand(this.phoneCode, userId))
      .subscribe((data: IVerifyPhoneCodeResponse) => {
        this.verifyPhoneResponse = data;
        this.router.navigateByUrl('login').then(r => r);
      }, error => {

        if(error.error.title != undefined) {
          alert("invalid confirmation code");
        }
        else {
          alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " "));
        }

      });
  }
}
