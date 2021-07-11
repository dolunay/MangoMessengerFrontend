import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterCommand} from "./models/commands/RegisterCommand";
import {Observable} from "rxjs";
import {IRegisterResponse} from "./models/responses/IRegisterResponse";

@Injectable({
  providedIn: 'root'
})
export class MangoService {
  private mangoApiUrl = 'https://mango-messenger-app.herokuapp.com/api';

  constructor(private httpClient: HttpClient) {
  }

  register(command: RegisterCommand): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(this.mangoApiUrl, command);
  }
}
