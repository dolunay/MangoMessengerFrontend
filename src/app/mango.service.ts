import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SendCodePayload} from "./payload/SendCodePayload";
import {Observable} from "rxjs";
import {SendCodeResponse} from "./responses/SendCodeResponse";

@Injectable({
  providedIn: 'root'
})
export class MangoService {
  private mangoApiUrl = 'https://api.mangomessenger.com';

  constructor(private httpClient: HttpClient) {
  }

  sendCode(payload: SendCodePayload): Observable<SendCodeResponse> {
    return this.httpClient.post<SendCodeResponse>(this.mangoApiUrl + '/auth/send-code', payload, {withCredentials: true});
  }
}
