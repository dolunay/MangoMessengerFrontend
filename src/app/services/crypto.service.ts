import * as CryptoJS from 'crypto-js';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBaseResponse} from "../../types/responses/IBaseResponse";
import {ApiRoute} from "../../consts/ApiRoute";
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private commonSecret: string = '';
  private userRoute = 'api/users/public-key/'
  private userId: string = '';

  constructor(private httpClient: HttpClient,
              private userService: UsersService) {
    this.userService.getCurrentUser().subscribe(response => {
      this.userId = response.user.userId;
    })
  }

  encryptUsingAES256(message: string): string {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(message), this.commonSecret);
    return encrypted.toString();
  }

  decryptUsingAES256(encryptedString: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedString, this.commonSecret);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getSecretKey(): string | null {
    let userAlias = this.userId + '_MangoSecret';
    return localStorage.getItem(userAlias);
  }

  writeSecretKey(secret: string): void {
    this.userService.getCurrentUser().subscribe(response => {
      const userAlias = response.user.userId + '_MangoSecret';
      localStorage.setItem(userAlias, secret);
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  setCommonSecret(commonSecret: string): void {
    this.commonSecret = commonSecret;
  }

  updatePublicKey(publicKey: number): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.userRoute + publicKey, {});
  }
}
