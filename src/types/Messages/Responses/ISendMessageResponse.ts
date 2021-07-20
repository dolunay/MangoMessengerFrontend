import {IBaseResponse} from "../../IBaseResponse";
import {IMessage} from "../Models/IMessage";

export interface ISendMessageResponse extends IBaseResponse {
    chatMessage: IMessage;
}