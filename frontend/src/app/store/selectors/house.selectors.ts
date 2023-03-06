// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { EntitySelectors, selectAll } from '@ngrx/entity';
// import { House } from '../../house.module';
// import { HousesState } from '../reducers/house.reducer';

// export const selectHousesState = createFeatureSelector<HousesState>('houses');

// export const selectHouseEntities: EntitySelectors<House, HousesState> = selectAll<House>();

// export const selectAllHouses = createSelector(
//   selectHousesState,
//   selectHouseEntities
// );

// export const selectSelectedHouseId = createSelector(
//   selectHousesState,
//   (state) => state.selectedHouseId
// );

// export const getSelectedHouse = createSelector(
//   selectHousesState,
//   selectSelectedHouseId,
//   (houses: House[], id: string) => houses.find((h: House) => h._id === id) || null
// );

// export const getHouseById = createSelector(
//   selectHouseEntities,
//   (houses: House[], id: string) => houses.find((h: House) => h._id === id) || null
// );

// export const selectHousesLoading = createSelector(
//   selectHousesState,
//   (state) => state.loading
// );

// export const selectHousesLoaded = createSelector(
//   selectHousesState,
//   (state) => state.housesLoaded
// );

// export const selectHousesError = createSelector(
//   selectHousesState,
//   (state) => state.errorMessage
// );
