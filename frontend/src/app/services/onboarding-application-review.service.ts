import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Onboarding } from '../models/onboarding.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingApplicationReviewService {

  private baseUrl = 'http://localhost:3000/application'

  constructor(private http: HttpClient) { }

  approveApplication(applicationID: any): Observable<Onboarding> {
    return this.http.post<Onboarding>(`${this.baseUrl}/approve/${applicationID}`, {});
  }

  rejectApplication(applicationID: any): Observable<Onboarding> {
    return this.http.post<Onboarding>(`${this.baseUrl}/reject/${applicationID}`, {});
  }
}
