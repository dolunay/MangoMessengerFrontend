import {Component, OnInit} from '@angular/core';
import {MangoService} from "../../mango.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VerificationMethod} from 'src/types/Auth/Enums/VerificationMethod';
import {IRegisterResponse} from "../../../types/Auth/Responses/IRegisterResponse";
import {RegisterCommand} from "../../../types/Auth/Requests/RegisterCommand";

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
  DisplayName = 'Main tester';

  registerResponse!: IRegisterResponse;

  keys!: any[];
  verificationMethod = VerificationMethod;

  constructor(private service: MangoService, private route: ActivatedRoute, private router: Router) {
    this.keys = Object.keys(this.verificationMethod).filter(k => !isNaN(Number(k)));
  }

  register(): void {
    this.service.register(new RegisterCommand(this.PhoneNumber, this.Email, this.DisplayName, this.Password,
      this.VerificationMethod, this.TermsAccepted)).subscribe((data: IRegisterResponse) => {
      this.registerResponse = data;

      console.log(this.registerResponse);
      console.log(this.registerResponse.success)

      if (!this.registerResponse.success) {
        // to implement
        console.log(this.registerResponse.message);
        return;
      }

      if (this.VerificationMethod === VerificationMethod.Email) {
        this.router.navigateByUrl('verify-email').then(r => r);
        return;
      }

      this.router.navigateByUrl('verify-phone').then(r => r);
    });
  }


  ngOnInit(): void {
  }

}
