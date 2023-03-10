import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { EmployeeWorkAuthorizationStatus, RequiredWorkAuthorizationDocument, WorkAuthorizationStatusEnum } from 'src/app/models/work-authorization-status';
import { EmployeeWorkAuthorizationStatusService } from 'src/app/services/employee-work-authorization-status.service';

@Component({
  selector: 'app-work-authorization-management-employee',
  templateUrl: './work-authorization-management-employee.component.html',
  styleUrls: ['./work-authorization-management-employee.component.css']
})
export class WorkAuthorizationManagementEmployeeComponent implements OnInit {
  loaded: boolean = false;
  status: EmployeeWorkAuthorizationStatus;
  uploadSteps: MenuItem[] = [];
  currentStep: RequiredWorkAuthorizationDocument;
  employeeId: string = '';
  activeIndex: number;
  uploadedFile;

  onUpload(event) {

  }

  ngOnInit(): void {
    this.employeeWorkAuthorizationStatusService
      .getEmployeeWorkAuthorizationStatus(this.employeeId)
      .subscribe((status: EmployeeWorkAuthorizationStatus) => {
        this.status = status;
        this.employeeId = status.employeeId;
        let indexNotSet = true;
        this.status.uploadFlow.forEach((document: RequiredWorkAuthorizationDocument, i: number) => {
          console.log(document);
          if (indexNotSet
            && (document.status === WorkAuthorizationStatusEnum.NOT_UPLOADED
              || document.status === WorkAuthorizationStatusEnum.REJECTED
              || document.status === WorkAuthorizationStatusEnum.PENDING_FOR_REVIEW)
          ) {
            this.currentStep = document;
            this.activeIndex = i;
            indexNotSet = false;
          }
          this.uploadSteps.push({ label: document.documentType });
        });
        this.uploadSteps.push({ label: 'Fully Approved' });
        if (indexNotSet) {
          this.activeIndex = this.uploadSteps.length - 1;
        }
        console.log(this.currentStep);
        this.loaded = true;
      });
  }

  constructor(
    private employeeWorkAuthorizationStatusService: EmployeeWorkAuthorizationStatusService
  ) { }
}
