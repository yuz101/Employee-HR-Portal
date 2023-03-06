import { createReducer, on } from '@ngrx/store';
import * as HousesActions from '../actions/house.actions';
import { House, HouseResponse } from '../../models/house';
import * as HouseActions from '../actions/house.actions';

export const houseFeatureKey = 'house';

export interface State {
  house: House | null;
  selectedEmployeeId: string | null;
  error: any;
  entities: House[];
  selectedId: string | null;
  summaryView: boolean;
}

export const initialState: State = {
  house: null,
  selectedEmployeeId: null,
  error: null,
  entities: [],
  selectedId: null,
  summaryView: true,
};

export const reducer = createReducer(
  initialState,

  on(HouseActions.loadHouse, state => state),

  on(HouseActions.loadHouseSuccess, (state, { house }) => ({
    ...state,
    house,
    error: null
  })),

  on(HouseActions.loadHouseFailure, (state, { error }) => ({
    ...state,
    house: null,
    error
  })),

  on(HouseActions.selectHouse, (state, { employeeId }) => ({
    ...state,
    selectedEmployeeId: employeeId,
    error: null
  })),

  on(HouseActions.selectHouseSuccess, (state, { houseResponse }) => ({
    ...state,
    house: houseResponse.house,
    error: null
  })),

  on(HouseActions.selectHouseFailure, (state, { error }) => ({
    ...state,
    house: null,
    error
  })),

  on(HousesActions.loadHousesSuccess, (state, { houses }) => ({
    ...state,
    entities: houses,
  })),

  on(HousesActions.setSelectedHouseId, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),

  on(HousesActions.loadHouseDetailsSuccess, (state, { house }) => ({
    ...state,
    entities: state.entities.map((h) => (h._id === house._id ? house : h)),
  })),

  on(HousesActions.toggleSummaryView, (state) => ({
    ...state,
    summaryView: !state.summaryView,
  }))
);
