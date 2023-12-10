export interface ResetPasswordRequest {
	requestId: string | null;
	newPassword: string;
	repeatPassword: string;
}
