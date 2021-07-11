import {Component, OnInit} from '@angular/core';
import {MangoService} from "../../mango.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IGetUserChatsResponse} from "../../models/responses/chats/IGetUserChatsResponse";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userChatsResponse!: IGetUserChatsResponse;

  constructor(private service: MangoService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getUserChats().subscribe((data: IGetUserChatsResponse) => {
      this.userChatsResponse = data;
      console.log(this.userChatsResponse);
    })
  };

}
