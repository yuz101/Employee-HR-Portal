import { Component, OnInit } from '@angular/core';
interface EmployeeVisaStatus {
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
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  workAuthorization: string | null;
  visaStatus: EmployeeVisaStatus | null;
}

@Component({
  selector: 'app-visa-management-hr',
  templateUrl: './visa-management-hr.component.html',
  styleUrls: ['./visa-management-hr.component.css']
})
export class VisaManagementHrComponent implements OnInit {
  employees: Employee[];

  displayWorkAuthorization: boolean;

  ngOnInit() {
    this.employees = exampleEmployees;
  }
}


const exampleEmployees = [
  {
    firstName: 'Yuru', lastName: 'Zhou', middleName: '', preferredName: 'Amy', workAuthorization: 'OPT',
    visaStatus: {
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
    firstName: 'Qingyuan', lastName: 'Liu', middleName: '', preferredName: '', workAuthorization: 'H1-B',
    visaStatus: {
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
    firstName: 'Paul', lastName: 'Zhou', middleName: '', preferredName: '', workAuthorization: 'OPT',
    visaStatus: {
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
    firstName: 'Dafei', lastName: 'Du', middleName: '', preferredName: '', workAuthorization: 'OPT',
    visaStatus: {
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
  { firstName: 'John', lastName: 'Doe', middleName: '', preferredName: '', workAuthorization: 'Citizen', visaStatus: null },
];