import type { IContact } from '../models/IContact';
import type { IBaseResponse } from './IBaseResponse';

export interface ISearchContactsResponse extends IBaseResponse {
	contacts: IContact[];
}
