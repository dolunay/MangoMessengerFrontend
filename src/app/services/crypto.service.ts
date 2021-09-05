import * as CryptoJS from 'crypto-js';
import {Tokens} from "../../consts/Tokens";

export class CryptoService {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
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
}
