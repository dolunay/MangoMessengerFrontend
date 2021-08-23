import {Component, Input, OnInit} from '@angular/core';
import {UserChatsService} from "../../../services/user-chats.service";
import {ChatsService} from "../../../services/chats.service";
import {IGetUserChatsResponse} from "../../../../types/responses/IGetUserChatsResponse";
import {ArchiveChatCommand} from "../../../../types/requests/ArchiveChatCommand";
import {IArchiveChatResponse} from "../../../../types/responses/IArchiveChatResponse";

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {

  constructor(private userChatsService: UserChatsService, private chatService: ChatsService) {
  }

  ngOnInit(): void {
  }

  @Input() chatTitle: string = '';
  @Input() membersCount: number = 0;
  @Input() chatId: string = '';

  onArchiveClick(): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {
      const chat = data.chats.filter(x => x.chatId === this.chatId)[0];
      const command = new ArchiveChatCommand(this.chatId, !chat.isArchived);
      console.log(command);
      this.userChatsService.putArchiveChat(command).subscribe((data: IArchiveChatResponse) => {
      }, error => {
        alert(error.error.ErrorMessage);
      })
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onDeleteClick(): void {
    console.log(this.chatId);
  }

}
