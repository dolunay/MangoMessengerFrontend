import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-self-message',
  templateUrl: './self-message.component.html',
  styleUrls: ['./self-message.component.scss']
})
export class SelfMessageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  @Input() message: string;
  // @ts-ignore
  @Input() sentDateTime: string;
  // @ts-ignore
  @Input() status: string;

}
