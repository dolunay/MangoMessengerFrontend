import {IBaseResponse} from "./IBaseResponse";
import {IUser} from "../models/IUser";

export interface ISearchResponse extends IBaseResponse {
  users: IUser[];
}
