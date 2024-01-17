import type { ITokens } from '../models/ITokens';
import type { IBaseResponse } from './IBaseResponse';

export interface ITokensResponse extends IBaseResponse {
	tokens: ITokens;
}
