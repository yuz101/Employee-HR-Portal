import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, map, catchError } from 'rxjs';
import { EmployeeCurrentWorkAuthorizationStatusRecord, CurrentWorkAuthorizationStatus, WorkAuthorizationStatusEnum, EmployeeWorkAuthorizationStatus, WorkAuthorizationDocumentTypeEnum } from '../models/work-authorization-status';

@Injectable({
  providedIn: 'root'
})
export class EmployeeWorkAuthorizationStatusService {
  private baseUrl = 'http://localhost:3000';

  getEmployeeWorkAuthorizationStatusRecords(): Observable<Array<EmployeeCurrentWorkAuthorizationStatusRecord>> {
    const url = `${this.baseUrl}/hr/current-work-authorization-status-records`;
    // return of(currentRecordsMock);
    return this.http.get<EmployeeCurrentWorkAuthorizationStatusRecord[]>(url).pipe(
      map((response: any) => response.currentRecords),
      catchError((error: any) => {
        console.error(error);
        return of([]);
      })
    );
  }

  approveDocument(employeeId: string): Observable<CurrentWorkAuthorizationStatus> {
    const url = `${this.baseUrl}/hr/document-status`;
    const requestBody = { employeeId, action: 'approve', feedback: '' };
    // return of(approveReturnStatusMock);
    return this.http.patch<CurrentWorkAuthorizationStatus>(url, requestBody).pipe(
      map((response: any) => response.newStatusRecord),
    );
  }

  rejectDocument(employeeId: string, feedback: string): Observable<CurrentWorkAuthorizationStatus> {
    const url = `${this.baseUrl}/hr/document-status`;
    const requestBody = { employeeId, action: 'reject', feedback };
    // return of(rejectReturnStatusMock);
    return this.http.patch<CurrentWorkAuthorizationStatus>(url, requestBody).pipe(
      map((response: any) => response.newStatusRecord),
    );
  }

  getEmployeeWorkAuthorizationStatus(employeeId?: string): Observable<EmployeeWorkAuthorizationStatus> {
    let url = '';
    if (!employeeId) {
      url = `${this.baseUrl}/hr/work-authorization-record`;
    } else{
      url = `${this.baseUrl}/hr/work-authorization-record?employeeId=${employeeId}`;
    }
    // return of(statusMock);
    return this.http.get<EmployeeWorkAuthorizationStatus>(url).pipe(
      map((response: any) => response.workAuthorizationRecord),
    );
  }

  sendWorkAuthorizationReminderEmailToEmployee(employeeId: string) {
    return this.http.post(`${this.baseUrl}/hr/work-authorization-reminder`, { employeeId })
  }

  constructor(private http: HttpClient) { }
}

// const statusMock: EmployeeWorkAuthorizationStatus = {
//   employeeId: '1',
//   workAuthorizationType: 'OPT',
//   started: true,
//   completed: false,
//   uploadFlow: [
//     {
//       status: WorkAuthorizationStatusEnum.APPROVED,
//       documentType: 'OPT Receipt',
//       feedback: '',
//     },
//     {
//       status: WorkAuthorizationStatusEnum.APPROVED,
//       documentType: 'OPT EAD',
//       feedback: '',
//     },
//     {
//       status: WorkAuthorizationStatusEnum.NOT_UPLOADED,
//       documentType: 'I-983',
//       feedback: '',
//     },
//     {
//       status: WorkAuthorizationStatusEnum.NOT_UPLOADED,
//       documentType: 'I-20',
//       feedback: '',
//     },
//   ],
// }

// const approveReturnStatusMock: CurrentWorkAuthorizationStatus = {
//   started: true,
//   completed: false,
//   documentType: 'The Next Document',
//   documentStatus: WorkAuthorizationStatusEnum.NOT_UPLOADED,
//   feedback: '',
//   action: {
//     name: 'Send Notification',
//   },
// }

// const rejectReturnStatusMock: CurrentWorkAuthorizationStatus = {
//   started: true,
//   completed: false,
//   documentType: 'Still Current Document',
//   documentStatus: WorkAuthorizationStatusEnum.REJECTED,
//   feedback: 'This is not the correct document.',
//   action: {
//     name: 'Send Notification',
//   },
// }

// const currentRecordsMock: EmployeeCurrentWorkAuthorizationStatusRecord[] = [
//   {
//     employeeId: '1',
//     firstName: 'Yuru', lastName: 'Zhou', middleName: '', preferredName: 'Amy', workAuthorization: 'OPT',
//     workAuthorizationStatus: {
//       started: true,
//       completed: false,
//       documentType: 'OPT Receipt',
//       documentStatus: 'Not Uploaded',
//       feedback: '',
//       action: {
//         name: 'Send Notification',
//       },
//     },
//   },
//   {
//     employeeId: '2',
//     firstName: 'Qingyuan', lastName: 'Liu', middleName: '', preferredName: '', workAuthorization: 'H1-B',
//     workAuthorizationStatus: {
//       started: false,
//       completed: false,
//       documentType: '',
//       documentStatus: '',
//       feedback: '',
//       action: {
//         name: 'Send Notification',
//       },
//     },
//   },
//   {
//     employeeId: '3',
//     firstName: 'Paul', lastName: 'Zhou', middleName: '', preferredName: '', workAuthorization: 'OPT',
//     workAuthorizationStatus: {
//       started: true,
//       completed: false,
//       documentType: 'I-983',
//       documentStatus: 'Pending for Review',
//       feedback: '',
//       action: {
//         name: 'Review',
//       },
//     },
//   },
//   {
//     employeeId: '4',
//     firstName: 'Dafei', lastName: 'Du', middleName: '', preferredName: '', workAuthorization: 'OPT',
//     workAuthorizationStatus: {
//       started: true,
//       completed: true,
//       documentType: 'I-983',
//       documentStatus: 'Approved',
//       feedback: '',
//       action: {
//         name: 'View',
//       },
//     },
//   },
// ]