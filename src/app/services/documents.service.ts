import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiRoute} from "../../consts/ApiRoute";
import {IUploadDocumentResponse} from "../../types/responses/IUploadDocumentResponse";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private documentsRoute = 'api/documents/'

  constructor(private httpClient: HttpClient) {
  }

  uploadDocument(formData: FormData): Observable<IUploadDocumentResponse> {
    return this.httpClient.post<IUploadDocumentResponse>(ApiRoute.route + this.documentsRoute, formData);
  }
}
