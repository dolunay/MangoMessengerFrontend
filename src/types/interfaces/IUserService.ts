import {Observable} from "rxjs";
import {IGetUserResponse} from "../responses/IGetUserResponse";
import {RegisterCommand} from "../requests/RegisterCommand";
import {IRegisterResponse} from "../responses/IRegisterResponse";
import {IVerifyPhoneCodeResponse} from "../responses/IVerifyPhoneCodeResponse";
import {VerifyEmailCommand} from "../requests/VerifyEmailCommand";
import {IVerifyEmailResponse} from "../responses/IVerifyEmailResponse";

export interface IUserService {
  postUser(command: RegisterCommand): Observable<IRegisterResponse>;

  putPhoneConfirmation(phoneCode: number): Observable<IVerifyPhoneCodeResponse>;

  getUserById(userId: string): Observable<IGetUserResponse>;

  getCurrentUser(): Observable<IGetUserResponse>;

  putEmailConfirmation(request: VerifyEmailCommand): Observable<IVerifyEmailResponse>;
}
