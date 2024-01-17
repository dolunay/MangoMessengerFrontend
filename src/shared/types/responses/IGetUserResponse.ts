import type { IUser } from '../models/IUser';
import type { IBaseResponse } from './IBaseResponse';

export interface IGetUserResponse extends IBaseResponse {
	user: IUser;
}
