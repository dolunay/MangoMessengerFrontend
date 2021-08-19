import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IVerifyPhoneCodeResponse} from "../../../types/responses/IVerifyPhoneCodeResponse";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent {

  phoneCode!: number;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) {
  }

  verifyPhone(): void {
    this.usersService.putPhoneConfirmation(this.phoneCode).subscribe((data: IVerifyPhoneCodeResponse) => {
        this.router.navigateByUrl('login').then(r => alert(data.message));
      }, error => {
        alert(error.error.ErrorMessage);
      });
  }
}
