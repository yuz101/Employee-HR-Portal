// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EMPTY } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';
// import { HouseService } from '../../services/house.service';
// import { loadHouses, loadHousesSuccess } from '../actions/house.actions';

// @Injectable()
// export class HouseEffects {

//   loadHouses$ = createEffect(() => this.actions$.pipe(
//     ofType(loadHouses),
//     mergeMap(() => this.houseService.getHouses()
//       .pipe(
//         map(houses => loadHousesSuccess({ houses })),
//         catchError(() => EMPTY)
//       ))
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private houseService: HouseService
//   ) {}
// }
