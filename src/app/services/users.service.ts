import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Domain, UserRoutes} from "../../consts/Routes";
import {IUserService} from "../../types/interfaces/IUserService";
import {IGetUserResponse} from "../../types/responses/IGetUserResponse";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUserService {

  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<IGetUserResponse> {
    const accessToken = this.authService.getAccessToken();
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserResponse>(Domain.route + UserRoutes.route, header);
  }

  getUserById(userId: string): Observable<IGetUserResponse> {
    const accessToken = this.authService.getAccessToken();
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`)
    };

    return this.httpClient.get<IGetUserResponse>(Domain.route + UserRoutes.route + userId, header);
  }
}
