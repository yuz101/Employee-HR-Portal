import { TestBed } from '@angular/core/testing';

import { OnboardingApplicationReviewService } from './onboarding-application-review.service';

describe('OnboardingApplicationReviewService', () => {
  let service: OnboardingApplicationReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingApplicationReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
