import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { House } from '../../models/house';
import { HouseService } from '../../services/house.service';
import { catchError, filter, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css'],
})
export class HouseListComponent implements OnInit {
  houses: any[] = []; // list of houses
  currentPage = 1; // current page
  pageSize = 5; // number of houses to display per page

  houses$: Observable<House[]> = of([]);

  constructor(private houseService: HouseService) {}

  ngOnInit(): void {
    this.houses$ = this.houseService.getHouses().pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error:', error);
        return of([]);
      }),
      map((response: any) => response.houses), // access the houses property of the response
      filter(Array.isArray),
      map((houses: House[]) => {
        return houses.map((house: House) => {
          return {
            ...house,
            id: house._id ? house._id : '',
          };
        });
      })
    );

    this.houses$.subscribe((houses: House[]) => {
      console.log('Houses:', houses);
    });
  }
}
