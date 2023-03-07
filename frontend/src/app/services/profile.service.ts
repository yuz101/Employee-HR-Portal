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
    console.log("get profile")
    return this.http.get<Employee>(`${this.baseUrl}`);
  }

  save(profile: Employee): Observable<Employee> {
    const body = {userId: '6406a1ebe4b8843c1c90cecd', ...profile};
    return this.http.put<Employee>(`${this.baseUrl}`, body);
  }
}
