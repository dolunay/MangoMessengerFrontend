import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-password-restore-request',
  templateUrl: './password-restore-request.component.html',
  styleUrls: ['./password-restore-request.component.scss']
})
export class PasswordRestoreRequestComponent implements OnInit {
  phoneOrEmail = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  sendPasswordRestoreRequest(): void {

  }

}
