import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-review',
  templateUrl: './document-review.component.html',
  styleUrls: ['./document-review.component.css'],
})
export class DocumentReviewComponent implements OnInit {
  pdfSrc: string;
  @Input() employeeId: string;

  ngOnInit() {
    // this.pdfSrc = 'https://employee-management-employee-info.s3.us-east-2.amazonaws.com/documents/123/opt-receipt.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQN2M4K6TMINX4DSB%2F20230306%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230306T204210Z&X-Amz-Expires=3600&X-Amz-Signature=131ae5b7056804bf106c423081b86a409be09fcd936ab344843acbdcdb792f56&X-Amz-SignedHeaders=host';
    this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }
}
