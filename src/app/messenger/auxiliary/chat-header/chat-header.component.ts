import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input() chatTitle: string = '';
  @Input() membersCount: number = 0;
  @Input() chatId: string = '';

  onArchiveClick(): void {
    console.log(this.chatId);
  }

  onDeleteClick(): void {
    console.log(this.chatId);
  }

}
