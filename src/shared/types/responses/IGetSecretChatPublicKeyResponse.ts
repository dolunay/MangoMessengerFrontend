import type { IBaseResponse } from './IBaseResponse';

export interface IGetSecretChatPublicKeyResponse extends IBaseResponse {
	publicKey: number;
}
