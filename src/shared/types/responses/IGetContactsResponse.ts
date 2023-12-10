import type { IContact } from '../models/IContact';
import type { IBaseResponse } from './IBaseResponse';

export interface IGetContactsResponse extends IBaseResponse {
	contacts: IContact[];
}
