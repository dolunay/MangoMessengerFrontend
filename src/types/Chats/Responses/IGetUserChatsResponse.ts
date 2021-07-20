import {IChat} from "../Models/IChat";
import {IBaseResponse} from "../../IBaseResponse";

export interface IGetUserChatsResponse extends IBaseResponse {
    chats: IChat[];
}