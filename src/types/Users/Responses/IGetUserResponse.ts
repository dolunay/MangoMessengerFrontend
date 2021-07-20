import {IBaseResponse} from "../../IBaseResponse";
import {IUser} from "../Models/IUser";

export interface IGetUserResponse extends IBaseResponse {
    user: IUser;
}