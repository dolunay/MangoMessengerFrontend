import {IBaseResponse} from "../IBaseResponse";
import {IUserChat} from "../../dto/IUserChat";

export interface IGetUserChatsResponse extends IBaseResponse {
  chats: IUserChat[];
}
