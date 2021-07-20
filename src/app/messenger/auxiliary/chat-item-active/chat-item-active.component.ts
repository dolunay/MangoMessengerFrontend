import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-item-active',
  templateUrl: './chat-item-active.component.html',
  styleUrls: ['./chat-item-active.component.scss']
})
export class ChatItemActiveComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  @Input() chatName: string;
  // @ts-ignore
  @Input() lastMessage: string;
  // @ts-ignore
  @Input() lastMessageDateTime: string;

}
