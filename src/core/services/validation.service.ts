import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ValidationService {
	private allowedFileExtensions = ['jpg', 'JPG', 'txt', 'TXT', 'pdf', 'PDF', 'png', 'PNG'];

	validateField(field: string, fieldName: string): void {
		if (!field) throw new Error(`Error: field '${fieldName}' is empty.`);
	}

	validateFileName(fileName: string): void {
		const fileExtension = fileName.split('.')[1];
		if (!this.allowedFileExtensions.includes(fileExtension)) throw new Error('Error: file extension not allowed.');
		if (fileName.length > 50) throw new Error('Error: file name length exceeds the allowed symbol count.');
	}
}
