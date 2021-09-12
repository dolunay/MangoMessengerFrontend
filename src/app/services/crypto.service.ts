import * as CryptoJS from 'crypto-js';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBaseResponse} from "../../types/responses/IBaseResponse";
import {ApiRoute} from "../../consts/ApiRoute";
import {UsersService} from "./users.service";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private userRoute = 'api/users/public-key/'

  constructor(private httpClient: HttpClient,
              private userService: UsersService,
              private sessionService: SessionService) {
  }

  encryptUsingAES256(message: string, commonSecret: string): string {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(message), commonSecret);
    return encrypted.toString();
  }

  decryptUsingAES256(encryptedMessage: string, commonSecret: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, commonSecret);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getSecretKey(): string | null {
    let userAlias = this.sessionService.getUserId() + '_UserSecret';
    return localStorage.getItem(userAlias);
  }

  writeSecretKey(secret: string): void {
    let userAlias = this.sessionService.getUserId() + '_UserSecret';
    localStorage.setItem(userAlias, secret);
  }

  updatePublicKey(publicKey: number): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.userRoute + publicKey, {});
  }

  writeChatCommonSecret(chatId: string, commonSecret: string) {
    const chatAlias = chatId + '_ChatSecret';
    localStorage.setItem(chatAlias, commonSecret);
  }

  getCommonChatSecret(chatId: string): string | null {
    const chatAlias = chatId + '_ChatSecret';
    return localStorage.getItem(chatAlias);
  }
}
