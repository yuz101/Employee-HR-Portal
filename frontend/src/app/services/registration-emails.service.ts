import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationEmailResponse } from '../models/registration-email';

@Injectable({
  providedIn: 'root'
})
export class RegistrationEmailsService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/hr/registration-emails'

  getRegistrationEmails(): Observable<RegistrationEmailResponse> {
    return this.http.get<RegistrationEmailResponse>(`${this.baseUrl}`);
  }
}
