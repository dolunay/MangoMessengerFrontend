import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterCommand} from "../types/Auth/Requests/RegisterCommand";
import {IRegisterResponse} from "../types/Auth/Responses/IRegisterResponse";
import {AuthRoutes, ChatsRoutes} from "../consts/Routes";
import {VerifyPhoneCommand} from "../types/Auth/Requests/VerifyPhoneCommand";
import {IVerifyPhoneCodeResponse} from "../types/Auth/Responses/IVerifyPhoneCodeResponse";
import {LoginCommand} from "../types/Auth/Requests/LoginCommand";
import {ILoginResponse} from "../types/Auth/Responses/ILoginResponse";
import {IRefreshTokenResponse} from "../types/Auth/Responses/IRefreshTokenResponse";
import {IGetUserChatsResponse} from "../types/Chats/Responses/IGetUserChatsResponse";
import {Tokens} from "../consts/Tokens";

@Injectable({
  providedIn: 'root'
})
export class MangoService {
  private mangoApiUrl = 'https://mango-messenger-app.herokuapp.com/';

  constructor(private httpClient: HttpClient) {
  }

  register(command: RegisterCommand): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(this.mangoApiUrl + AuthRoutes.postRegister, command);
  }

  verifyPhone(command: VerifyPhoneCommand): Observable<IVerifyPhoneCodeResponse> {
    return this.httpClient.post<IVerifyPhoneCodeResponse>(this.mangoApiUrl + AuthRoutes.getVerifyPhone, command);
  }

  login(command: LoginCommand): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(this.mangoApiUrl + AuthRoutes.postLogin, command,
      {withCredentials: true});
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    return this.httpClient.post<IRefreshTokenResponse>(this.mangoApiUrl + AuthRoutes.postRefreshToken, {});
  }

  getUserChats(): Observable<IGetUserChatsResponse> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem(Tokens.accessToken)}`)
    };
    return this.httpClient.get<IGetUserChatsResponse>(this.mangoApiUrl + ChatsRoutes.getChats, header);
  }
}
