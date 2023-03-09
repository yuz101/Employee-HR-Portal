import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from 'primeng/dynamicdialog';
import { DocumentReviewComponent } from './document-review/document-review.component';
import { EmployeeWorkAuthorizationStatusService } from '../../services/employee-work-authorization-status.service';
import { EmployeeCurrentWorkAuthorizationStatusRecord, EmployeeDocumentLink, WorkAuthorizationStatusEnum } from 'src/app/models/work-authorization-status';
import { selectEmployeeWorkAuthorizationStatusRecords } from 'src/app/store/selectors/employee-work-authorization-status-records.selectors';
import { EmployeeWorkAuthorizationStatusRecordsActions } from 'src/app/store/actions/employee-work-authorization-status-records.action';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { EmployeeDocumentService } from 'src/app/services/employee-document.service';

@Component({
  selector: 'app-visa-management-hr',
  templateUrl: './visa-management-hr.component.html',
  styleUrls: ['./visa-management-hr.component.css'],
  providers: [DialogService, EmployeeWorkAuthorizationStatusService]
})
export class VisaManagementHrComponent implements OnInit {
  workAuthorizationStatusRecords$: Observable<EmployeeCurrentWorkAuthorizationStatusRecord[]>
    = this.store.select(selectEmployeeWorkAuthorizationStatusRecords);

  isLoading: boolean;
  displayWorkAuthorization: boolean;
  allWorkAuthorizationStatus = WorkAuthorizationStatusEnum;
  uploadedDocuments: EmployeeDocumentLink[] = [];

  constructor(
    private store: Store,
    public dialogService: DialogService,
    private workAuthorizationStatusService: EmployeeWorkAuthorizationStatusService,
    private employeeDocumentService: EmployeeDocumentService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.workAuthorizationStatusService
      .getEmployees()
      .subscribe((records) => {
        return this.store.dispatch(
          EmployeeWorkAuthorizationStatusRecordsActions.retrieveRecordList({ statusRecords: records })
        );
      });
    this.isLoading = false;
  }

  clear(table: Table) {
    table.clear();
  }

  showDocumentReviewDialog(employeeId: string, documentType: string) {
    const ref = this.dialogService.open(DocumentReviewComponent, {
      data: {
        employeeId: employeeId,
        documentType: documentType,
      },
      header: `Review Document: ${documentType}`,
      width: '90%',
    });
  }

  approveDocument(employeeId: string) {
    this.workAuthorizationStatusService
      .approveDocument(employeeId)
      .subscribe((newStatus) => {
        this.store.dispatch(
          EmployeeWorkAuthorizationStatusRecordsActions.approveDocument({ employeeId, newStatus })
        );
      });
  }

  showWorkAuthorizationDialog(employeeId: string) {
    this.displayWorkAuthorization = true;
    this.employeeDocumentService.getAllDocuments(employeeId)
      .subscribe((documents) => {
        this.uploadedDocuments = documents;
      });
  }
}