import type { IBaseResponse } from './IBaseResponse';

export interface IDeleteMessageResponse extends IBaseResponse {
	messageId: string;
}
