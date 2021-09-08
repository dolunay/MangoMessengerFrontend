import {Observable} from "rxjs";
import {IGetUserResponse} from "../responses/IGetUserResponse";
import {RegisterCommand} from "../requests/RegisterCommand";
import {VerifyEmailCommand} from "../requests/VerifyEmailCommand";
import {UpdateAccountInformationCommand} from "../requests/UpdateAccountInformationCommand";
import {ChangePasswordCommand} from "../requests/ChangePasswordCommand";
import {ITokensResponse} from "../responses/ITokensResponse";
import {IBaseResponse} from "../responses/IBaseResponse";
import {UpdateUserSocialsCommand} from "../requests/UpdateUserSocialsCommand";

export interface IUserService {
  postUser(command: RegisterCommand): Observable<ITokensResponse>;

  putPhoneConfirmation(phoneCode: number): Observable<IBaseResponse>;

  getUserById(userId: string): Observable<IGetUserResponse>;

  getCurrentUser(): Observable<IGetUserResponse>;

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IBaseResponse>;

  updateUserAccountInformation(request: UpdateAccountInformationCommand): Observable<IBaseResponse>;

  putChangePassword(request: ChangePasswordCommand): Observable<IBaseResponse>;

  updateUserSocials(request: UpdateUserSocialsCommand): Observable<IBaseResponse>;
}
