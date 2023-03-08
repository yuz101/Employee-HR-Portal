import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { EmployeeWorkAuthorizationStatusRecord, WorkAuthorizationStatus, WorkAuthorizationStatusEnum } from '../models/work-authorization-status';

@Injectable({
  providedIn: 'root'
})
export class EmployeeWorkAuthorizationStatusService {

  getEmployees(): Observable<Array<EmployeeWorkAuthorizationStatusRecord>> {
    return of(recordsMock);
  }

  approveDocument(employeeId: string): Observable<WorkAuthorizationStatus> {
    return of(approveReturnStatusMock);
  }

  rejectDocument(employeeId: string, feedback: string): Observable<WorkAuthorizationStatus> {
    return of(rejectReturnStatusMock);
  }

  constructor() { }
}

const approveReturnStatusMock: WorkAuthorizationStatus = {
  started: true,
  completed: false,
  documentType: 'The Next Document',
  documentStatus: WorkAuthorizationStatusEnum.NOT_UPLOADED,
  feedback: '',
  action: {
    name: 'Send Notification',
  },
}

const rejectReturnStatusMock: WorkAuthorizationStatus = {
  started: true,
  completed: false,
  documentType: 'Still Current Document',
  documentStatus: WorkAuthorizationStatusEnum.REJECTED,
  feedback: 'This is not the correct document.',
  action: {
    name: 'Send Notification',
  },
}

const recordsMock: EmployeeWorkAuthorizationStatusRecord[] = [
  {
    employeeId: '1',
    firstName: 'Yuru', lastName: 'Zhou', middleName: '', preferredName: 'Amy', workAuthorization: 'OPT',
    workAuthorizationStatus: {
      started: true,
      completed: false,
      documentType: 'OPT Receipt',
      documentStatus: 'Not Uploaded',
      feedback: '',
      action: {
        name: 'Send Notification',
      },
    },
  },
  {
    employeeId: '2',
    firstName: 'Qingyuan', lastName: 'Liu', middleName: '', preferredName: '', workAuthorization: 'H1-B',
    workAuthorizationStatus: {
      started: false,
      completed: false,
      documentType: '',
      documentStatus: '',
      feedback: '',
      action: {
        name: 'Send Notification',
      },
    },
  },
  {
    employeeId: '3',
    firstName: 'Paul', lastName: 'Zhou', middleName: '', preferredName: '', workAuthorization: 'OPT',
    workAuthorizationStatus: {
      started: true,
      completed: false,
      documentType: 'I-983',
      documentStatus: 'Pending for Review',
      feedback: '',
      action: {
        name: 'Review',
      },
    },
  },
  {
    employeeId: '4',
    firstName: 'Dafei', lastName: 'Du', middleName: '', preferredName: '', workAuthorization: 'OPT',
    workAuthorizationStatus: {
      started: true,
      completed: true,
      documentType: 'I-983',
      documentStatus: 'Approved',
      feedback: '',
      action: {
        name: 'View',
      },
    },
  },
]