import { TestBed } from '@angular/core/testing';

import { EmployeeDocumentService } from './employee-document.service';

describe('EmployeeDocumentService', () => {
  let service: EmployeeDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
