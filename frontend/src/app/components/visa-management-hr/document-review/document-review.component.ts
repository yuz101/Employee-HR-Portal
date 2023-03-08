import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeWorkAuthorizationStatusService } from 'src/app/services/employee-work-authorization-status.service';
import { EmployeeWorkAuthorizationStatusRecordsActions } from 'src/app/store/actions/employee-work-authorization-status-records.action';

@Component({
  selector: 'app-document-review',
  templateUrl: './document-review.component.html',
  styleUrls: ['./document-review.component.css'],
})
export class DocumentReviewComponent implements OnInit {
  pdfSrc: string;
  employeeId: string;

  constructor(
    private store: Store,
    private workAuthorizationStatusService: EmployeeWorkAuthorizationStatusService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    // this.pdfSrc = 'https://employee-management-employee-info.s3.us-east-2.amazonaws.com/documents/123/opt-receipt.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQN2M4K6TMINX4DSB%2F20230306%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230306T204210Z&X-Amz-Expires=3600&X-Amz-Signature=131ae5b7056804bf106c423081b86a409be09fcd936ab344843acbdcdb792f56&X-Amz-SignedHeaders=host';
    this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    this.employeeId = this.config.data.employeeId;
  }

  onApprove(employeeId: string): void {
    this.workAuthorizationStatusService
      .approveDocument(employeeId)
      .subscribe((newStatus) => {
        this.store.dispatch(
          EmployeeWorkAuthorizationStatusRecordsActions.approveDocument({ employeeId, newStatus })
        );
      });
    this.ref.close();
  }

  onReject(employeeId: string, feedback: string): void {
    this.workAuthorizationStatusService
      .rejectDocument(employeeId, feedback)
      .subscribe((newStatus) => {
        this.store.dispatch(
          EmployeeWorkAuthorizationStatusRecordsActions.approveDocument({ employeeId, newStatus })
        );
      });
    this.ref.close();
  }
}
