import * as CryptoJS from 'crypto-js';

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
}
