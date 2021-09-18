import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {SendMessageCommand} from "../../../../types/requests/SendMessageCommand";
import {IChat} from "../../../../types/models/IChat";
import {CommunityType} from "../../../../types/enums/CommunityType";
import {CryptoService} from "../../../services/crypto.service";
import {ChatsService} from "../../../services/chats.service";
import {Tokens} from "../../../../consts/Tokens";

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html'
})
export class ChatFooterComponent implements OnInit {

  constructor(private messageService: MessagesService,
              private chatsService: ChatsService,
              private cryptoService: CryptoService) {
  }

  currentMessageText: string = '';

  @Input() chat: IChat = {
    chatId: "",
    chatLogoImageUrl: "",
    communityType: CommunityType.DirectChat,
    description: "",
    isArchived: false,
    isMember: false,
    lastMessage: null,
    membersCount: 0,
    title: ""
  }

  @Output() notifyParentOnSendMessage = new EventEmitter();

  sendMessage(event: any): void {
    return this.onMessageSendClick(event);
  }

  onMessageSendClick(event: any): void {
    const sendMessageCommand = new SendMessageCommand(this.currentMessageText, this.chat.chatId);

    if (this.chat.communityType === CommunityType.SecretChat) {
      sendMessageCommand.isEncrypted = true;
      const userSecret = this.cryptoService.getSecretKey();

      if (userSecret != null) {
        this.chatsService.getSecretChatPublicKey(this.chat.chatId).subscribe(response => {
          let commonSecret = this.cryptoService.getCommonChatSecret(this.chat.chatId);

          if (!commonSecret) {
            const calculateCommonSecret = Math.pow(response.publicKey, Number(userSecret)) % Tokens.modulus;
            commonSecret = calculateCommonSecret.toString();
            this.cryptoService.writeChatCommonSecret(this.chat.chatId, commonSecret);
          }

          console.log('common secret footer: ' + commonSecret);
          sendMessageCommand.messageText = this.cryptoService
            .encryptUsingAES256(sendMessageCommand.messageText, commonSecret);

          console.log(sendMessageCommand);

          this.messageService.sendMessage(sendMessageCommand).subscribe(_ => {
            this.currentMessageText = '';
            this.notifyParentOnSendMessage.emit();
          }, error => {
            alert(error.error.ErrorMessage);
          })
        })
      }
    } else {
      this.messageService.sendMessage(sendMessageCommand).subscribe(_ => {
        this.currentMessageText = '';
        this.notifyParentOnSendMessage.emit();
      }, error => {
        alert(error.error.ErrorMessage);
      })
    }
  }

  ngOnInit(): void {
  }

}
