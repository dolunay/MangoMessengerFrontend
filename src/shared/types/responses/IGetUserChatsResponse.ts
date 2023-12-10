import type { IChat } from '../models/IChat';
import type { IBaseResponse } from './IBaseResponse';

export interface IGetUserChatsResponse extends IBaseResponse {
	chats: IChat[];
}
