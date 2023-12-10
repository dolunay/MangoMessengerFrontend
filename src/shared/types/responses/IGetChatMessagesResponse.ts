import type { IMessage } from '../models/IMessage';
import type { IBaseResponse } from './IBaseResponse';

export interface IGetChatMessagesResponse extends IBaseResponse {
	messages: IMessage[];
}
