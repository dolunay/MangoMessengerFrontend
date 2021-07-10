import {Component, OnInit} from '@angular/core';
import {MangoService} from "../mango.service";
import {SendCodeResponse} from "../responses/SendCodeResponse";
import {SendCodePayload} from "../payload/SendCodePayload";

@Component({
  selector: 'app-send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss']
})
export class SendCodeComponent implements OnInit {
  // @ts-ignore
  sendCodeResponse: SendCodeResponse;

  // @ts-ignore
  phoneNumber: string;
  // @ts-ignore
  countryCode: string;
  // @ts-ignore
  fingerPrint: string;

  constructor(private service: MangoService) {
  }

  sendCode() : void {
    this.service.sendCode(new SendCodePayload(this.phoneNumber, this.countryCode, this.fingerPrint))
      .subscribe((data: SendCodeResponse) => {
        this.sendCodeResponse = data;
      });
  }

  ngOnInit(): void {
  }

}
