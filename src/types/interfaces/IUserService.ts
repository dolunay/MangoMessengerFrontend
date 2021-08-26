import {Observable} from "rxjs";
import {IGetUserResponse} from "../responses/IGetUserResponse";
import {RegisterCommand} from "../requests/RegisterCommand";
import {VerifyEmailCommand} from "../requests/VerifyEmailCommand";
import {UpdateUserInformationCommand} from "../requests/UpdateUserInformationCommand";
import {ISearchResponse} from "../responses/ISearchResponse";
import {ChangePasswordCommand} from "../requests/ChangePasswordCommand";
import {ITokensResponse} from "../responses/ITokensResponse";
import {IBaseResponse} from "../responses/IBaseResponse";

export interface IUserService {
  postUser(command: RegisterCommand): Observable<ITokensResponse>;

  putPhoneConfirmation(phoneCode: number): Observable<IBaseResponse>;

  getUserById(userId: string): Observable<IGetUserResponse>;

  getCurrentUser(): Observable<IGetUserResponse>;

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IBaseResponse>;

  putUpdateUserInformation(request: UpdateUserInformationCommand): Observable<IBaseResponse>;

  getSearchUsers(displayName: string): Observable<ISearchResponse>;

  putChangePassword(request: ChangePasswordCommand): Observable<IBaseResponse>;
}
