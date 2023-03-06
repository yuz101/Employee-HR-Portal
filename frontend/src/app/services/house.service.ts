import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { House, HouseResponse } from '../models/house';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private apiUrl = 'http://localhost:3000/hr/housing';
  private baseUrl = 'http://localhost:3000/housing'

  constructor(private http: HttpClient) {}

  addHouse(house: House): Observable<House> {
    console.log('addHouse: ', Observable<House>);
    return this.http.post<House>(`${this.apiUrl}`, house);
  }

  getHouses(): Observable<House[]> {
    console.log('getHouse');
    return this.http.get<House[]>(this.apiUrl);
  }

  getHouseDetails(id: string): Observable<HouseResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<HouseResponse>(url);
  }

  updateHouse(house: House): Observable<House> {
    return this.http.put<House>(`${this.apiUrl}/${house._id}`, house);
  }

  deleteHouse(id: string): Observable<House> {
    return this.http.delete<House>(`${this.apiUrl}/${id}`);
  }

  getHouseByEmployeeId(employeeId: string): Observable<HouseResponse> {
    const url = `${this.baseUrl}/${employeeId}`;
    return this.http.get<HouseResponse>(url);
  }
}
