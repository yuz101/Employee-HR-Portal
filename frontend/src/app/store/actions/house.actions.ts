import { createAction, props } from '@ngrx/store';
import { House } from '../../house.module';

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
