import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, map } from 'rxjs';
import { DocumentTypeEnum, EmployeeDocumentLink, WorkAuthorizationDocumentTypeEnum } from '../models/work-authorization-status';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getOneDocument(
    employeeId: string,
    documentType: WorkAuthorizationDocumentTypeEnum
  ): Observable<EmployeeDocumentLink> {
    const url = `${this.baseUrl}/documents?employeeId=${employeeId}&documentType=${documentType}`;
    // return of(oneDocumentMock);
    return this.http.get<EmployeeDocumentLink>(url).pipe(
      map((response: any) => response.downloadLink),
    );
  }

  getAllDocuments(employeeId?: string): Observable<EmployeeDocumentLink[]> {
    if (employeeId) {
      return this.http.get<EmployeeDocumentLink[]>(`${this.baseUrl}/documents?employeeId=${employeeId}`);
    } else {
      return this.http.get<EmployeeDocumentLink[]>(`${this.baseUrl}/documents`);
    }
  }

  uploadDocument(file: File, documentType: DocumentTypeEnum | WorkAuthorizationDocumentTypeEnum): Observable<EmployeeDocumentLink> {
    const formData = new FormData();
    console.log('file: ', file);
    console.log('documentType: ', documentType);
    formData.append('document', file);
    formData.append('documentType', documentType);
    return this.http.post<EmployeeDocumentLink>(`${this.baseUrl}/documents`, formData);
  }

}

const oneDocumentMock: EmployeeDocumentLink = {
  fileName: 'opt-receipt',
  downloadLink: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
}

const allDocumentsMock: EmployeeDocumentLink[] = [
  {
    fileName: 'opt-receipt.pdf',
    downloadLink: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
  {
    fileName: 'opt-ead.pdf',
    downloadLink: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
  {
    fileName: 'i-20.pdf',
    downloadLink: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
  },
];