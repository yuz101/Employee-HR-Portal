import { TestBed } from '@angular/core/testing';

import { RegistrationEmailsService } from './registration-emails.service';

describe('RegistrationEmailsService', () => {
  let service: RegistrationEmailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationEmailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
