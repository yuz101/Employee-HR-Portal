import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Onboarding } from '../models/onboarding.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingApplicationService {

  private baseUrl = 'http://localhost:3000/application'

  constructor(private http: HttpClient) { }

  getOnboardingApplicationByID(id): Observable<Onboarding> {
    return this.http.get<Onboarding>(`${this.baseUrl}/applicationID/${id}`);
  }

  getAllApplications(): Observable<Onboarding[]> {
    return this.http.get<Onboarding[]>(`${this.baseUrl}/allapplication`);
  }
}
