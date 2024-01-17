import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type {
	IBaseResponse,
	IGetUserResponse,
	ISearchContactsResponse,
	ITokensResponse,
	IUpdateProfilePictureResponse,
} from '@shared/types/responses';
import type {
	ChangePasswordCommand,
	RegisterCommand,
	UpdateAccountInformationCommand,
	UpdateUserSocialsCommand,
	VerifyEmailCommand,
} from '@shared/types/requests';

import type { IUser } from '@shared/types/models';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	private usersRoute = 'api/users/';
	private httpClient = inject(HttpClient);
	private events$ = new Subject<IUser>();

	// PUT /api/users/socials

	assignSubject(value: IUser) {
		this.events$.next(value);
	}

	getEvents() {
		return this.events$.asObservable();
	}

	updateUserSocials(request: UpdateUserSocialsCommand): Observable<IBaseResponse> {
		return this.httpClient.put<IBaseResponse>(`${environment.baseUrl + this.usersRoute}socials/`, request);
	}

	// GET /api/users/{userId}
	getUserById(userId: string | null): Observable<IGetUserResponse> {
		return this.httpClient.get<IGetUserResponse>(environment.baseUrl + this.usersRoute + userId);
	}

	// POST /api/users
	createUser(command: RegisterCommand): Observable<ITokensResponse> {
		return this.httpClient.post<ITokensResponse>(environment.baseUrl + this.usersRoute, command);
	}

	// PUT /api/users/email-confirmation
	confirmEmail(request: VerifyEmailCommand): Observable<IBaseResponse> {
		return this.httpClient.put<IBaseResponse>(`${environment.baseUrl + this.usersRoute}email-confirmation/`, request);
	}

	// PUT /api/users/{phoneCode}
	confirmPhone(phoneCode: number): Observable<IBaseResponse> {
		return this.httpClient.put<IBaseResponse>(environment.baseUrl + this.usersRoute + phoneCode, {});
	}

	// PUT /api/users/account
	updateUserAccountInformation(request: UpdateAccountInformationCommand): Observable<IBaseResponse> {
		return this.httpClient.put<ISearchContactsResponse>(`${environment.baseUrl + this.usersRoute}account/`, request);
	}

	// PUT /api/users/password
	changePassword(request: ChangePasswordCommand): Observable<IBaseResponse> {
		return this.httpClient.put<IBaseResponse>(`${environment.baseUrl + this.usersRoute}password/`, request);
	}

	getUserProfilePicture(user: IUser): string {
		return user.pictureUrl ? user.pictureUrl : 'assets/media/avatar/4.png';
	}

	// POST /api/users/picture/{image}
	updateProfilePicture(formData: FormData): Observable<IUpdateProfilePictureResponse> {
		return this.httpClient.post<IUpdateProfilePictureResponse>(
			`${environment.baseUrl + this.usersRoute}picture`,
			formData,
		);
	}
}
