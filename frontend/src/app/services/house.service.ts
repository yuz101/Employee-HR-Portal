import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { House, HouseResponse } from '../house.module';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private apiUrl = 'http://localhost:3000/hr/housing';

  constructor(private http: HttpClient) {}

  addHouse(house: House): Observable<House> {
    console.log('addHouse: ', Observable<House>);
    return this.http.post<House>(`${this.apiUrl}`, house);
  }

  getHouses(): Observable<House[]> {
    console.log('getHouse');
    return this.http.get<House[]>(this.apiUrl);
  }

  // getHouse(id: string): Observable<House> {
  //   return this.http.get<HouseResponse>(`${this.apiUrl}/${id}`).pipe(
  //     map((response: HouseResponse) => response.house),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error(error);
  //       return throwError('Error retrieving house');
  //     })
  //   );
  // }

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
}
