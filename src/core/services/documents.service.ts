import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { IUploadDocumentResponse } from '@shared/types/responses';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class DocumentsService {
	private documentsRoute = 'api/documents/';
	private httpClient = inject(HttpClient);

	// POST /api/documents
	uploadDocument(formData: FormData): Observable<IUploadDocumentResponse> {
		return this.httpClient.post<IUploadDocumentResponse>(environment.baseUrl + this.documentsRoute, formData);
	}
}
