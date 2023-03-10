import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { DocumentTypeEnum, EmployeeDocumentLink, EmployeeWorkAuthorizationStatus, RequiredWorkAuthorizationDocument, WorkAuthorizationDocumentTypeEnum, WorkAuthorizationStatusEnum } from 'src/app/models/work-authorization-status';
import { EmployeeDocumentService } from 'src/app/services/employee-document.service';
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
  uploadedFile: [File, DocumentTypeEnum | WorkAuthorizationDocumentTypeEnum];
  uploadedFilePreview: EmployeeDocumentLink;
  uploadedFilePreviewDialog: boolean = false;

  customUpload(event, type: DocumentTypeEnum | WorkAuthorizationDocumentTypeEnum) {
    for (let file of event.files) {
      this.uploadedFile = [file, type];
    }
    console.log(this.uploadedFile)
    this.employeeDocumentService.uploadDocument(this.uploadedFile[0], this.uploadedFile[1])
      .subscribe({
        next: () => {
          console.log('Upload completed.');
          window.location.reload();
        }, error: (error) => {
          // it is not correctly triggered because the response does not have a body
          console.error(error);
          window.location.reload();
        }, complete: () => {
          // window.location.reload();
        },
      });
  }

  ngOnInit(): void {
    this.employeeWorkAuthorizationStatusService
      .getEmployeeWorkAuthorizationStatus()
      .subscribe((status) => {
        this.status = status;
        this.employeeId = status.employeeId;
        let indexNotSet = true;
        console.log(this.employeeId)
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

            this.employeeDocumentService.getOneDocument(this.employeeId, this.currentStep.documentType)
              .subscribe({
                next: (documentLink: EmployeeDocumentLink) => {
                  console.log(documentLink);
                  this.uploadedFilePreview = documentLink;
                }, error: (error) => {
                  console.log(error);
                }
              }
              )
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
    private employeeWorkAuthorizationStatusService: EmployeeWorkAuthorizationStatusService,
    private employeeDocumentService: EmployeeDocumentService,
  ) { }
}
