import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { House, HouseResponse } from '../../models/house';

export const loadHouse = createAction('[House] Load House');
export const loadHouseSuccess = createAction('[House] Load House Success', props<{ house: House }>());
export const loadHouseFailure = createAction('[House] Load House Failure', props<{ error: any }>());

export const selectHouse = createAction('[House] Select House', props<{ employeeId: string }>());
export const selectHouseSuccess = createAction('[House] Select House Success', props<{ houseResponse: HouseResponse }>());
export const selectHouseFailure = createAction('[House] Select House Failure', props<{ error: any }>());

export const loadHouses = createAction('[Houses] Load Houses');
export const loadHousesSuccess = createAction(
  '[Houses] Load Houses Success',
  props<{ houses: House[] }>()
);
export const loadHousesFailure = createAction(
  '[Houses] Load Houses Failure',
  props<{ error: any }>()
);

export const setSelectedHouseId = createAction(
  '[Houses] Set Selected House Id',
  props<{ id: string }>()
);

export const loadHouseDetails = createAction(
  '[Houses] Load House Details',
  props<{ id: string }>()
);
export const loadHouseDetailsSuccess = createAction(
  '[Houses] Load House Details Success',
  props<{ house: House }>()
);
export const loadHouseDetailsFailure = createAction(
  '[Houses] Load House Details Failure',
  props<{ error: any }>()
);

export const toggleSummaryView = createAction('[Houses] Toggle Summary View');


export const DELETE_HOUSE = '[House] Delete House';

export class DeleteHouse implements Action {
  readonly type = DELETE_HOUSE;

  constructor(public payload: string) {}
}

export type HouseActions = DeleteHouse;
