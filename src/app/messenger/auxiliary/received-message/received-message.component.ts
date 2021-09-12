import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IMessage} from "../../../../types/models/IMessage";
import {MessagesService} from "../../../services/messages.service";
import {CryptoService} from "../../../services/crypto.service";
import {Tokens} from "../../../../consts/Tokens";

@Component({
  selector: 'app-received-message',
  templateUrl: './received-message.component.html'
})
export class ReceivedMessageComponent {

  constructor(private messageService: MessagesService,
              private cryptoService: CryptoService) {
  }

  @Input() message: IMessage = {
    messageAuthorPictureUrl: "",
    authorPublicKey: 0,
    isEncrypted: false,
    updatedAt: "",
    messageId: "",
    messageText: "",
    self: false,
    createdAt: "",
    userDisplayName: ""
  };

  @Output() notifyParentOnDeleteMessage = new EventEmitter<string>();

  deleteMessage(): void {
    this.messageService.deleteMessage(this.message.messageId).subscribe((data) => {
      this.notifyParentOnDeleteMessage.emit(data.messageId);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  getMessageText() : string {
    if (this.message.isEncrypted){
      const secret = this.cryptoService.getSecretKey();
      const commonSecret = Math.pow(this.message.authorPublicKey, Number(secret)) % Tokens.modulus;
      this.cryptoService.setCommonSecret(commonSecret.toString());
      return this.cryptoService.decryptUsingAES256(this.message.messageText);
    }

    return this.message.messageText;
  }
}
