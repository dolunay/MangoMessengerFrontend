import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  @Input() groupName: string;
  // @ts-ignore
  @Input() lastMessage: string;
  // @ts-ignore
  @Input() lastMessageAuthor: string;
  // @ts-ignore
  @Input() lastMessageDateTime: string;
}
