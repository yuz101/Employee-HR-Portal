import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, houseFeatureKey } from '../reducers/house.reducers';

export const selectHouseState = createFeatureSelector<State>(houseFeatureKey);

export const selectHouse = createSelector(
  selectHouseState,
  state => state.house
);

export const selectSelectedEmployeeId = createSelector(
  selectHouseState,
  state => state.selectedEmployeeId
);

export const selectError = createSelector(
  selectHouseState,
  state => state.error
);

