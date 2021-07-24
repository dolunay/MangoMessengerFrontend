import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-received-message',
  templateUrl: './received-message.component.html',
  styleUrls: ['./received-message.component.scss']
})
export class ReceivedMessageComponent implements OnInit {

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
  // @ts-ignore
  @Input() messageAuthor: string;

  // @ts-ignore
  @Input() self: boolean;
}
