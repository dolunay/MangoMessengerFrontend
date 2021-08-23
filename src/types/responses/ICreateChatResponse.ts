import { IBaseResponse } from "./IBaseResponse";

export interface ICreateChatResponse extends IBaseResponse {
  chatId: string;
}
