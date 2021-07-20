import {IBaseResponse} from "../../IBaseResponse";
import {IMessage} from "../Models/IMessage";

export interface IGetChatMessagesResponse extends IBaseResponse{
    messages: IMessage[];
}