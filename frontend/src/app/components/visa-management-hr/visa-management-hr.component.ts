import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DocumentReviewComponent } from './document-review/document-review.component';
interface EmployeeWorkAuthorizationStatus {
  started: boolean;
  completed: boolean;
  documentType: string;
  documentStatus: string;
  feedback: string | null;
  action: {
    name: string;
  } | null
}

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  workAuthorization: string;
  workAuthorizationStatus: EmployeeWorkAuthorizationStatus | null;
}

enum WorkAuthorizationStatus {
  NOT_UPLOADED = 'Not Uploaded',
  PENDING_FOR_REVIEW = 'Pending for Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@Component({
  selector: 'app-visa-management-hr',
  templateUrl: './visa-management-hr.component.html',
  styleUrls: ['./visa-management-hr.component.css'],
  providers: [DialogService]
})
export class VisaManagementHrComponent implements OnInit {
  employees: Employee[];

  displayWorkAuthorization: boolean;
  allWorkAuthorizationStatus = WorkAuthorizationStatus;

  constructor(public dialogService: DialogService) { }

  ngOnInit() {
    this.employees = exampleEmployees;
  }

  showDocumentReviewDialog(employeeId: string) {
    const ref = this.dialogService.open(DocumentReviewComponent, {
    });
  }
}


const exampleEmployees = [
  {
    _id: '5f5b5b5b5b5b5b5b5b5b5b5b',
    firstName: 'Yuru', lastName: 'Zhou', middleName: '', preferredName: 'Amy', workAuthorization: 'OPT',
    workAuthorizationStatus: {
      started: true,
      completed: false,
      documentType: 'OPT Receipt',
      documentStatus: 'Not Uploaded',
      feedback: null,
      action: {
        name: 'Send Notification',
      },
    },
  },
  {
    _id: '5f5b5b5b5b5b5b5b5b5b5b5b',
    firstName: 'Qingyuan', lastName: 'Liu', middleName: '', preferredName: '', workAuthorization: 'H1-B',
    workAuthorizationStatus: {
      started: false,
      completed: false,
      documentType: '',
      documentStatus: '',
      feedback: null,
      action: {
        name: 'Send Notification',
      },
    },
  },
  {
    _id: '5f5b5b5b5b5b5b5b5b5b5b5b',
    firstName: 'Paul', lastName: 'Zhou', middleName: '', preferredName: '', workAuthorization: 'OPT',
    workAuthorizationStatus: {
      started: true,
      completed: false,
      documentType: 'I-983',
      documentStatus: 'Pending for Review',
      feedback: null,
      action: {
        name: 'Review',
      },
    },
  },
  {
    _id: '5f5b5b5b5b5b5b5b5b5b5b5b',
    firstName: 'Dafei', lastName: 'Du', middleName: '', preferredName: '', workAuthorization: 'OPT',
    workAuthorizationStatus: {
      started: true,
      completed: true,
      documentType: 'I-983',
      documentStatus: 'Approved',
      feedback: null,
      action: {
        name: 'View',
      },
    },
  },
  {
    _id: '5f5b5b5b5b5b5b5b5b5b5b5b',
    firstName: 'John', lastName: 'Doe', middleName: '', preferredName: '', workAuthorization: 'Citizen',
    workAuthorizationStatus: null
  },
];