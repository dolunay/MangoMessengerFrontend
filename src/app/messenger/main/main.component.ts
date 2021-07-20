import {Component, OnInit} from '@angular/core';
import {IGetUserChatsResponse} from "../../../types/Chats/Responses/IGetUserChatsResponse";
import {MangoService} from "../../mango.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // @ts-ignore
  getUserChatsResponse: IGetUserChatsResponse;

  constructor(private service: MangoService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getUserChats().subscribe((data: IGetUserChatsResponse) => {
      this.getUserChatsResponse = data;

      if (!this.getUserChatsResponse.success) {
        this.router.navigateByUrl('main').then(r => r);
      }
    })
  }
}
