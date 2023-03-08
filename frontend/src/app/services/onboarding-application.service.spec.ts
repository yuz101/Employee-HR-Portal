import { TestBed } from '@angular/core/testing';

import { OnboardingApplicationService } from './onboarding-application.service';

describe('OnboardingApplicationService', () => {
  let service: OnboardingApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
