import {IBaseResponse} from "../../IBaseResponse";

export interface IRefreshTokenResponse extends IBaseResponse {
  refreshToken: string;
  accessToken: string;
}
