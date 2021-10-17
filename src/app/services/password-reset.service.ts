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

  // POST /api/password-restore-request/{emailOrPhone}
  sendPasswordResetRequest(emailOrPhone: string): Observable<IBaseResponse> {
    return this.httpClient.post<IBaseResponse>(ApiRoute.route + this.currentRoute + emailOrPhone, {});
  }

  // PUT /api/password-restore-request
  resetPassword(request: ResetPasswordRequest): Observable<IBaseResponse> {
    return this.httpClient.put<IBaseResponse>(ApiRoute.route + this.currentRoute, request);
  }
}
