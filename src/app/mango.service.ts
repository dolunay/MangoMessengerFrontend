import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRegisterResponse} from "./models/responses/auth/IRegisterResponse";
import {RegisterCommand} from "./models/commands/auth/RegisterCommand";
import {VerifyPhoneCommand} from "./models/commands/auth/VerifyPhoneCommand";
import {IVerifyPhoneCodeResponse} from "./models/responses/auth/IVerifyPhoneCodeResponse";
import {LoginCommand} from "./models/commands/auth/LoginCommand";
import {ILoginResponse} from "./models/responses/auth/ILoginResponse";
import {IGetUserChatsResponse} from "./models/responses/chats/IGetUserChatsResponse";
import {IRefreshTokenResponse} from "./models/responses/auth/IRefreshTokenResponse";

@Injectable({
  providedIn: 'root'
})
export class MangoService {
  private mangoApiUrl = 'https://mango-messenger-app.herokuapp.com/api/';

  constructor(private httpClient: HttpClient) {
  }

  register(command: RegisterCommand): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(this.mangoApiUrl + 'auth/register', command);
  }

  verifyPhone(command: VerifyPhoneCommand): Observable<IVerifyPhoneCodeResponse> {
    return this.httpClient.post<IVerifyPhoneCodeResponse>(this.mangoApiUrl + 'auth/verify-phone', command);
  }

  login(command: LoginCommand): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(this.mangoApiUrl + 'auth/login', command, {withCredentials: true});
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    return this.httpClient.post<IRefreshTokenResponse>(this.mangoApiUrl, {});
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('MangoAccessToken')}`)
    };
    return this.httpClient.get<IGetUserChatsResponse>(this.mangoApiUrl + 'chats', header);
  }
}
