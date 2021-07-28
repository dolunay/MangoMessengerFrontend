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
  verificationMethod = VerificationMethod.Email;
  TermsAccepted = false;
  DisplayName = 'razumovskiy';

  registerResponse!: IRegisterResponse;
  verificationMethods = [VerificationMethod.Phone, VerificationMethod.Email];

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  register(): void {
    this.authService.register(new RegisterCommand(
      this.PhoneNumber,
      this.Email,
      this.DisplayName,
      this.Password,
      Number(this.verificationMethod),
      this.TermsAccepted)
    ).subscribe((data: IRegisterResponse) => {
        this.registerResponse = data;

        if (this.verificationMethod === VerificationMethod.Email) {
          alert(this.registerResponse.message.toLowerCase().replace("_", " "));
          return;
        }

        localStorage.setItem(Tokens.userId, data.userId);
        this.router.navigateByUrl('verify-phone').then(r => r);
      }, error => alert(error.error.ErrorMessage.toLowerCase().replaceAll("_", " ")) );
  }


  ngOnInit(): void {
  }

}
