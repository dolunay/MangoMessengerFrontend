import { IBaseResponse } from "./IBaseResponse";

export interface ICreateDirectChatResponse extends IBaseResponse {
  chatId: string;
}
