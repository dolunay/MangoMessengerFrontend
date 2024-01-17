import type { IChat } from '../models/IChat';
import type { IBaseResponse } from './IBaseResponse';

export interface IGetChatByIdResponse extends IBaseResponse {
	chat: IChat;
}
