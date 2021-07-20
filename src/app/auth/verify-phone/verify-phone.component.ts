import {Component, OnInit} from '@angular/core';
import {MangoService} from "../../mango.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IVerifyPhoneCodeResponse} from "../../../types/Auth/Responses/IVerifyPhoneCodeResponse";
import {VerifyPhoneCommand} from 'src/types/Auth/Requests/VerifyPhoneCommand';

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {

  phoneCode!: number;
  verifyPhoneResponse!: IVerifyPhoneCodeResponse;

  constructor(private service: MangoService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  verifyPhone(): void {
    this.service.verifyPhone(new VerifyPhoneCommand(this.phoneCode))
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
