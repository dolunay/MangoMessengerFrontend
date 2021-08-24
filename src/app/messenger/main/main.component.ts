import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {ChatsService} from "../../services/chats.service";
import {MessagesService} from "../../services/messages.service";
import {IGetUserChatsResponse} from "../../../types/responses/IGetUserChatsResponse";
import {IMessage} from "../../../types/models/IMessage";
import {IChat} from "../../../types/models/IChat";
import {ChatType} from "../../../types/enums/ChatType";
import {UserChatsService} from "../../services/user-chats.service";
import {ArchiveChatCommand} from "../../../types/requests/ArchiveChatCommand";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  messages: IMessage[] = [];
  chats: IChat[] = [];

  activeChatId = '';

  activeChat: IChat = {
    chatId: "",
    chatType: ChatType.DirectChat,
    image: "",
    isArchived: false,
    isMember: false,
    lastMessage: "",
    lastMessageAt: "",
    lastMessageAuthor: "",
    membersCount: 0,
    title: ""
  };

  chatFilter = 'All Chats';
  searchQuery = '';

  constructor(private authService: SessionService,
              private chatService: ChatsService,
              private messageService: MessagesService,
              private userChatsService: UserChatsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.chatService.getUserChats().subscribe((data) => {
        const routeChatId = this.route.snapshot.paramMap.get('chatId');
        this.chats = data.chats;

        if (routeChatId) {
          this.loadChatAndMessages(routeChatId);
          return;
        }

        const firstChat = data.chats[0];
        if (firstChat) {
          this.loadChatAndMessages(firstChat.chatId);
        }
      },
      error => {
        alert(error.error.ErrorMessage);
      });
  }

  loadChatAndMessages(chatId: string): void {
    this.messageService.getChatMessages(chatId).subscribe((getMessagesData) => {
        this.messages = getMessagesData.messages;
        this.activeChatId = chatId;
        this.chatService.getChatById(chatId).subscribe((getChatByIdData) => {
          if (getChatByIdData) {
            this.activeChat = getChatByIdData.chat;
            this.scrollToEnd();
          }
        }, error => {
          alert(error.error.ErrorMessage);
        })
      },
      error => {
        alert(error.error.ErrorMessage);
      });
  }

  scrollToEnd(): void {
    setTimeout(() => {
      let element = document.getElementById('messageList');
      element?.scrollIntoView({block: "end"});
    }, 0);
  }

  onMessageSend(): void {
    this.loadChatAndMessages(this.activeChatId);
  }

  onChatFilerClick(filer: string): void {
    this.chatService.getUserChats().subscribe((data: IGetUserChatsResponse) => {

      switch (filer) {
        case 'All Chats':
          this.chats = data.chats.filter(x => !x.isArchived);
          const firstChat = data.chats[0];
          if (firstChat) {
            this.loadChatAndMessages(firstChat.chatId);
          }
          break;
        case 'Groups':
          this.chats = data.chats.filter(x => x.chatType === ChatType.ReadOnlyChannel || x.chatType === ChatType.PublicChannel);
          break;
        case 'Direct Chats':
          this.chats = data.chats.filter(x => x.chatType === ChatType.DirectChat);
          break;
        case 'Archived':
          this.chats = data.chats.filter(x => x.isArchived);
          break;
        default:
          break;
      }

      this.chatFilter = filer;

    });
  }

  onSearchClick(): void {
    this.chatService.searchChat(this.searchQuery).subscribe((data) => {
      this.chats = data.chats;
      this.searchQuery = '';
      this.chatFilter = 'Search Results';
      console.log(data.chats);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onArchiveChatClick(): void {
    this.chatService.getUserChats().subscribe((data) => {
      const chat = data.chats.filter(x => x.chatId === this.activeChatId)[0];
      const command = new ArchiveChatCommand(this.activeChatId, !chat.isArchived);

      this.userChatsService.putArchiveChat(command).subscribe((_) => {
        this.onChatFilerClick('All Chats');
      }, error => {
        alert(error.error.ErrorMessage);
      })
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  onLeaveChatClick(): void {
    this.userChatsService.deleteLeaveChat(this.activeChatId).subscribe((_) => {
      this.onChatFilerClick('All Chats');
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  getMessageComponentClass(chat: IChat): string {
    return chat.chatId === this.activeChatId ? 'contacts-item friends active' : 'contacts-item friends';
  }

  deleteMessageFromMemory(messageId: string) {
    this.messages = this.messages.filter(x => x.messageId !== messageId);
  }
}
