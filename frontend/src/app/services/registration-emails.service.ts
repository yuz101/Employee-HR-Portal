import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationEmail, RegistrationEmailResponse } from '../models/registration-email';

@Injectable({
  providedIn: 'root'
})
export class RegistrationEmailsService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/hr'

  getRegistrationEmails(): Observable<RegistrationEmailResponse> {
    return this.http.get<RegistrationEmailResponse>(`${this.baseUrl}/registration-emails`);
  }

  sendRegistrationEmails(name, email): Observable<RegistrationEmail> {
    return this.http.post<RegistrationEmail>(`${this.baseUrl}/registration-email`, {name, email});
  }

  resendRegistrationEmails(id): Observable<RegistrationEmail> {
    return this.http.post<RegistrationEmail>(`${this.baseUrl}/resend-registration-email`, {registrationEmailId: id});
  }

  updateRegistrationEmail(registrationEmail: RegistrationEmail): Observable<RegistrationEmail> {
    return this.http.put<RegistrationEmail>(`${this.baseUrl}/registration-email`, registrationEmail);
  }
}
