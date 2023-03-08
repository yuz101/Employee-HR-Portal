import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/employee/profile'

  get(): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}`);
  }

  save(profile: Employee): Observable<Employee> {
    const body = {userId: '640798ffdf2c7f706d1a1eb7', ...profile};
    return this.http.put<Employee>(`${this.baseUrl}`, body);
  }
}
