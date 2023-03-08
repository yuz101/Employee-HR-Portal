import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/hr/profiles';

  constructor(private http: HttpClient) { }

  get_all_profiles(): Observable<{ message: string, employees: Employee[] }> {
    console.log('getAllProfiles');
    return this.http.get<{ message: string, employees: Employee[] }>(this.apiUrl);
  }
  
  getProfiles(searchQuery: string = ''): Observable<{ message: string, employees: Employee[] }> {
    console.log('getProfiles');
    return this.http.get<{ message: string, employees: Employee[] }>(`${this.apiUrl}?search=${searchQuery}`);
  }

  getAllProfiles(): Observable<Array<Employee>> {
    console.log('new --- getAllProfiles');
    return this.http.get<Array<Employee>>(this.apiUrl);
  }
}
