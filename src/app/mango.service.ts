import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterCommand} from "./models/commands/auth/RegisterCommand";
import {IRegisterResponse} from "./models/responses/auth/IRegisterResponse";
import {VerifyPhoneCommand} from "./models/commands/auth/VerifyPhoneCommand";
import {IVerifyPhoneCodeResponse} from "./models/responses/auth/IVerifyPhoneCodeResponse";
import {ILoginResponse} from "./models/responses/auth/ILoginResponse";
import {LoginCommand} from "./models/commands/auth/LoginCommand";
import {IRefreshTokenResponse} from "./models/responses/auth/IRefreshTokenResponse";
import {IGetUserChatsResponse} from "./models/responses/chats/IGetUserChatsResponse";
import {Tokens} from "./models/consts/tokens";
import {Routes} from "./models/consts/routes";

@Injectable({
  providedIn: 'root'
})
export class MangoService {
  private mangoApiUrl = 'https://mango-messenger-app.herokuapp.com/api/';

  constructor(private httpClient: HttpClient) {
  }

  register(command: RegisterCommand): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(this.mangoApiUrl + Routes.authRegister, command);
  }

  verifyPhone(command: VerifyPhoneCommand): Observable<IVerifyPhoneCodeResponse> {
    return this.httpClient.post<IVerifyPhoneCodeResponse>(this.mangoApiUrl + Routes.authVerifyPhone, command);
  }

  login(command: LoginCommand): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(this.mangoApiUrl + Routes.authLogin, command,
      {withCredentials: true});
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    return this.httpClient.post<IRefreshTokenResponse>(this.mangoApiUrl + Routes.authRefreshToken, {});
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem(Tokens.accessToken)}`)
    };
    return this.httpClient.get<IGetUserChatsResponse>(this.mangoApiUrl + Routes.userChats, header);
  }
}
