import {IBaseResponse} from "../../IBaseResponse";

export interface IRegisterResponse extends IBaseResponse {
  accessToken: string;
  refreshToken: string;
}
