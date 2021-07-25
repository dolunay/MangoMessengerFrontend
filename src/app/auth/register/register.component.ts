import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VerificationMethod} from 'src/types/Auth/Enums/VerificationMethod';
import {IRegisterResponse} from "../../../types/Auth/Responses/IRegisterResponse";
import {RegisterCommand} from "../../../types/Auth/Requests/RegisterCommand";
import {AuthService} from "../../services/auth.service";
import {Tokens} from "../../../consts/Tokens";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  PhoneNumber = '+3809749138593';
  Email = 'kolosovp94@gmail.com';
  Password = 'z[?6dMR#xmp=nr6q';
  VerificationMethod: VerificationMethod = 1;
  TermsAccepted = false;
  DisplayName = 'razumovskiy';

  registerResponse!: IRegisterResponse;

  keys!: any[];
  verificationMethod = VerificationMethod;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.keys = Object.keys(this.verificationMethod).filter(k => !isNaN(Number(k)));
  }

  register(): void {
    this.authService.register(new RegisterCommand(this.PhoneNumber, this.Email, this.DisplayName, this.Password,
      this.VerificationMethod, this.TermsAccepted)).subscribe((data: IRegisterResponse) => {
        this.registerResponse = data;

        if (this.VerificationMethod === VerificationMethod.Email) {
          this.router.navigateByUrl('verify-email').then(r => r);
          return;
        }

        localStorage.setItem(Tokens.userId, data.userId);
        this.router.navigateByUrl('verify-phone').then(r => r);
      },
      error => {

        switch (error.error.message) {
          case "USER_ALREADY_REGISTERED":
            alert("User Already Registered");
            break;
          case "INVALID_EMAIL":
            alert("Invalid Email");
            break;
          case "WEAK_PASSWORD":
            alert("Weak Password");
            break;
          case "TERMS_NOT_ACCEPTED":
            alert("Terms Not Accepted");
            break;
          case "INVALID_VERIFICATION_METHOD":
            alert("Invalid Verification Method");
            break;
          case "PHONE_NUMBER_OCCUPIED":
            alert("Phone Number Occupied");
            break;
          case "INVALID_DISPLAY_NAME":
            alert("Invalid Display Name");
            break;
        }

      });
  }


  ngOnInit(): void {
  }

}
