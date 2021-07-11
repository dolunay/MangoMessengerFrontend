import {Component, OnInit} from '@angular/core';
import {VerificationMethod} from 'src/app/models/enums/VerificationMethod';
import {IRegisterResponse} from "../../models/responses/auth/IRegisterResponse";
import {MangoService} from "../../mango.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterCommand} from "../../models/commands/auth/RegisterCommand";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  PhoneNumber = '+380974913858';
  Email = 'maintester@gmail.com';
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
