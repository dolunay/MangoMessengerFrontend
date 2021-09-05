import * as CryptoJS from 'crypto-js';
import {Tokens} from "../../consts/Tokens";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBaseResponse} from "../../types/responses/IBaseResponse";
import {ApiRoute} from "../../consts/ApiRoute";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private key: string = '';
  private userRoute = 'api/users/public-key/'


  constructor(private httpClient: HttpClient) {
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
    return localStorage.getItem(Tokens.secretKey);
  }

  writeSecretKey(key: string): void {
    localStorage.setItem(Tokens.secretKey, key);
  }

  setKey(key: string): void {
    this.key = key;
  }

  updatePublicKey(publicKey: number): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.userRoute + publicKey, {});
  }
}
