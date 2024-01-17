import type { IBaseResponse } from './IBaseResponse';

export interface IUpdateChatLogoResponse extends IBaseResponse {
	updatedLogoUrl: string;
}
