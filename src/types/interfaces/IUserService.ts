import {Observable} from "rxjs";
import {IGetUserResponse} from "../responses/IGetUserResponse";
import {RegisterCommand} from "../requests/RegisterCommand";
import {IRegisterResponse} from "../responses/IRegisterResponse";
import {IVerifyPhoneCodeResponse} from "../responses/IVerifyPhoneCodeResponse";
import {VerifyEmailCommand} from "../requests/VerifyEmailCommand";
import {IVerifyEmailResponse} from "../responses/IVerifyEmailResponse";
import {UpdateUserInformationCommand} from "../requests/UpdateUserInformationCommand";
import {IUpdateUserInformationResponse} from "../responses/IUpdateUserInformationResponse";
import {ISearchResponse} from "../responses/ISearchResponse";
import {ChangePasswordCommand} from "../requests/ChangePasswordCommand";
import {IChangePasswordResponse} from "../responses/IChangePasswordResponse";

export interface IUserService {
  postUser(command: RegisterCommand): Observable<IRegisterResponse>;

  putPhoneConfirmation(phoneCode: number): Observable<IVerifyPhoneCodeResponse>;

  getUserById(userId: string): Observable<IGetUserResponse>;

  getCurrentUser(): Observable<IGetUserResponse>;

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IVerifyEmailResponse>;

  putUpdateUserInformation(request: UpdateUserInformationCommand): Observable<IUpdateUserInformationResponse>;

  postSearch(displayName: string): Observable<ISearchResponse>;

  putChangePassword(request: ChangePasswordCommand): Observable<IChangePasswordResponse>;
}
