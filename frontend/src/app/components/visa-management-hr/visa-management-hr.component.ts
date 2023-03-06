import { Component, OnInit } from '@angular/core';

interface EmployeeVisaState {
  fullName: string;
  workAuthorization: string;
  nextStep: string;
  action;
}

@Component({
  selector: 'app-visa-management-hr',
  templateUrl: './visa-management-hr.component.html',
  styleUrls: ['./visa-management-hr.component.css']
})
export class VisaManagementHrComponent implements OnInit {
  employeeVisaStates: EmployeeVisaState[];

  ngOnInit() {
    this.employeeVisaStates = [
      { fullName: 'Yuru Zhou', workAuthorization: 'OPT', nextStep: 'Waiting for HR approval', action: 'Review' },
      { fullName: 'Qingyuan Liu', workAuthorization: 'Not submitted', nextStep: 'Submit onboarding application', action: 'Review' },
      { fullName: 'Paul Zhou', workAuthorization: 'Not submitted', nextStep: 'Submit document', action: 'Send Notification' },
      { fullName: 'Dafei Du', workAuthorization: 'OPT', nextStep: 'Submit document', action: 'Send Notification' },
    ];
  }
}
