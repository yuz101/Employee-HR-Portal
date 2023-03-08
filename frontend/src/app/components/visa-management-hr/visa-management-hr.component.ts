import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from 'primeng/dynamicdialog';
import { DocumentReviewComponent } from './document-review/document-review.component';
import { EmployeeWorkAuthorizationStatusService } from '../../services/employee-work-authorization-status.service';
import { EmployeeWorkAuthorizationStatusRecord } from 'src/app/models/work-authorization-status';
import { selectEmployeeWorkAuthorizationStatusRecords } from 'src/app/store/selectors/employee-work-authorization-status-records.selectors';
import { EmployeeWorkAuthorizationStatusRecordsActions } from 'src/app/store/actions/employee-work-authorization-status-records.action';
import { Observable } from 'rxjs';

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
  providers: [DialogService, EmployeeWorkAuthorizationStatusService]
})
export class VisaManagementHrComponent implements OnInit {
  workAuthorizationStatusRecords$: Observable<EmployeeWorkAuthorizationStatusRecord[]>
    = this.store.select(selectEmployeeWorkAuthorizationStatusRecords);

  displayWorkAuthorization: boolean;
  allWorkAuthorizationStatus = WorkAuthorizationStatus;

  constructor(
    private store: Store,
    public dialogService: DialogService,
    private workAuthorizationStatusService: EmployeeWorkAuthorizationStatusService) { }

  ngOnInit() {
    this.workAuthorizationStatusService
      .getEmployees()
      .subscribe((records) => {
        return this.store.dispatch(
          EmployeeWorkAuthorizationStatusRecordsActions.retrieveRecordList({ statusRecords: records })
        );
      });
  }

  showDocumentReviewDialog(employeeId: string) {
    const ref = this.dialogService.open(DocumentReviewComponent, {
      data: {
        employeeId: employeeId,
      },
      header: 'Review Document',
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
}