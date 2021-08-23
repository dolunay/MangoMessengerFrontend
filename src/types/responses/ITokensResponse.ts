import {IBaseResponse} from "./IBaseResponse";

export interface ITokensResponse extends IBaseResponse {
  accessToken: string;
  refreshToken: string;
}
