import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ErrorNotificationService {
	private errorMessages: Record<number, string> = {
		0: 'Cannot connect to the server. Response code: 0.',
		403:
			'Your account is not activated yet. ' +
			'Activate to start chatting. Activation links are sent by email after registration.',
		409: 'Conflict while creating chatroom',
		400: 'Bad Request',
		404: 'Not Found',
	};

	private handleErrorStatus(status: number, customMessage?: string): void {
		const errorMessage = this.errorMessages[status] || `Unhandled error status: ${status}.`;

		throw new Error(`${errorMessage} ${customMessage}`);
	}

	notifyOnError(error: any): void {
		this.handleErrorStatus(error.status);
	}

	notifyOnErrorWithComponentName(error: any, componentName: string): void {
		this.handleErrorStatus(error.status, componentName);
	}
}
