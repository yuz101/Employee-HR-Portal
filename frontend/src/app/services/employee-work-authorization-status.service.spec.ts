import { TestBed } from '@angular/core/testing';

import { EmployeeWorkAuthorizationStatusService } from './employee-work-authorization-status.service';

describe('EmployeeWorkAuthorizationStatusService', () => {
  let service: EmployeeWorkAuthorizationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeWorkAuthorizationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
