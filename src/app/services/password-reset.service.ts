import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBaseResponse} from "../../types/responses/IBaseResponse";
import {ApiRoute} from "../../consts/ApiRoute";
import {ResetPasswordRequest} from "../../types/requests/ResetPasswordRequest";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  constructor(private httpClient: HttpClient) {
  }

  private currentRoute = 'api/password-restore-request/';

  sendPasswordResetRequest(emailOrPhone: string): Observable<IBaseResponse> {
    return this.httpClient.post<IBaseResponse>(ApiRoute.route + this.currentRoute + emailOrPhone, {});
  }

  resetPassword(request: ResetPasswordRequest): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.currentRoute, request);
  }
}
