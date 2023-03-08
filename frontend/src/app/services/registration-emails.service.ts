import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationEmail, RegistrationEmailResponse, RegistrationEmailsResponse } from '../models/registration-email';

@Injectable({
  providedIn: 'root'
})
export class RegistrationEmailsService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/hr/registration-emails'

  getRegistrationEmails(): Observable<RegistrationEmailsResponse> {
    return this.http.get<RegistrationEmailsResponse>(`${this.baseUrl}/registration-emails`);
  }

  sendRegistrationEmails(firstName: string, middleName: string, lastName: string, email: string): Observable<RegistrationEmailResponse> {
    return this.http.post<RegistrationEmailResponse>(`${this.baseUrl}/registration-email`, {firstName, middleName, lastName, email});
  }

  resendRegistrationEmails(registrationEmailId: string): Observable<RegistrationEmailResponse> {
    return this.http.post<RegistrationEmailResponse>(`${this.baseUrl}/resend-registration-email`, {registrationEmailId});
  }

  updateRegistrationEmail(registrationEmail: RegistrationEmail): Observable<RegistrationEmailResponse> {
    return this.http.put<RegistrationEmailResponse>(`${this.baseUrl}/registration-email`, registrationEmail);
  }
}
