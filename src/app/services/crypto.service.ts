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
  private key: string = '';
  private userRoute = 'api/users/public-key/'

  constructor(private httpClient: HttpClient,
              private userService: UsersService) {
  }

  encryptUsingAES256(message: string): string {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(message), this.key);
    return encrypted.toString();
  }

  decryptUsingAES256(encryptedString: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedString, this.key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getSecretKey(): string | null {
    let userAlias: string = '';

    this.userService.getCurrentUser().subscribe(response => {
      userAlias = response.user.userId + '_MangoSecret';
    }, error => {
      alert(error.error.ErrorMessage);
    });

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

  setKey(key: string): void {
    this.key = key;
  }

  updatePublicKey(publicKey: number): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.userRoute + publicKey, {});
  }
}
