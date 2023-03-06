import { createReducer, on } from '@ngrx/store';
import { House } from '../../house.module';
import * as HousesActions from '../actions/house.actions';

export interface HousesState {
  entities: House[];
  selectedId: string | null;
  summaryView: boolean;
}

export const initialState: HousesState = {
  entities: [],
  selectedId: null,
  summaryView: true,
};

export const housesReducer = createReducer(
  initialState,

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
