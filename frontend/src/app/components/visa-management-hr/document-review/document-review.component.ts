import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, of } from 'rxjs';
import { WorkAuthorizationDocumentTypeEnum } from 'src/app/models/work-authorization-status';
import { EmployeeDocumentService } from 'src/app/services/employee-document.service';
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
  documentType: WorkAuthorizationDocumentTypeEnum;
  feedback: string;
  failedToLoadPdf: boolean = false;

  constructor(
    private store: Store,
    private workAuthorizationStatusService: EmployeeWorkAuthorizationStatusService,
    private employeeDocumentService: EmployeeDocumentService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    this.employeeId = this.config.data.employeeId;
    this.documentType = this.config.data.documentType;
    this.employeeDocumentService.getOneDocument(this.employeeId, this.documentType)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.failedToLoadPdf = true;
          return of(null);
        }),
      )
      .subscribe((linkInfo: any) => {
        this.pdfSrc = linkInfo.downloadLink;
    });
    // this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
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
