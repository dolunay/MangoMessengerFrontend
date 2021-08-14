import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IVerifyEmailResponse} from "../../../types/Auth/Responses/IVerifyEmailResponse";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  userId: string | null = '';
  email: string | null = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('id');
    this.userId = this.route.snapshot.paramMap.get('id2');
    this.authService.verifyEmail(this.email, this.userId).subscribe((data: IVerifyEmailResponse) => {
      let response = data;
      this.router.navigateByUrl('login').then(r => alert(response.message));
    }, error => {
      this.router.navigateByUrl('login').then(r => alert(error.message));
    })
  }

}
