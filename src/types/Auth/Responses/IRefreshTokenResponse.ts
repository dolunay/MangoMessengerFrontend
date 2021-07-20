import {IBaseResponse} from "../../IBaseResponse";

export interface IRefreshTokenResponse extends IBaseResponse {
  refreshTokenId: string;
  accessToken: string;
}
