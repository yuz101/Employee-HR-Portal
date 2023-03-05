import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  signup(username: string|null, email: string|null, password: string|null): Observable<User>{
    const url = `${this.baseUrl}/signup`
    const body = { username, email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(url, body, { headers })
  }

  login(username: string|null, email: string|null, password: string|null): Observable<User>{
    const url = `${this.baseUrl}/login`
    const body = { username, email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(url, body, { headers })
  }

}
