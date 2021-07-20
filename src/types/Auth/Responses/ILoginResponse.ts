import {IBaseResponse} from "../../IBaseResponse";

export interface ILoginResponse extends IBaseResponse {
  accessToken: string;
  refreshTokenId: string;
}
