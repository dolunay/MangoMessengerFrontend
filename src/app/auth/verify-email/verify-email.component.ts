import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyEmailCommand} from "../../../types/requests/VerifyEmailCommand";
import {IVerifyEmailResponse} from "../../../types/responses/IVerifyEmailResponse";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private sessionService: SessionService, private route: ActivatedRoute,
              private router: Router, private usersService: UsersService) {
  }

  success = false;
  message = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      const email = params['email'];
      this.usersService.putEmailConfirmation(new VerifyEmailCommand(email, userId))
        .subscribe((data: IVerifyEmailResponse) => {
          this.success = true;
        }, error => {
          this.message = error.error.ErrorMessage;
          alert(error.error.ErrorMessage);
        });
    });
  }
}
