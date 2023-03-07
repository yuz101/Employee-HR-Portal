import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';
import { adapter } from './employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employee');

export const {
  selectAll: selectAllEmployees,
  selectEntities: selectEmployeeEntities,
  selectIds: selectEmployeeIds,
  selectTotal: selectTotalEmployees,
} = adapter.getSelectors(selectEmployeeState);

export const selectEmployeeLoading = createSelector(selectEmployeeState, (state) => state.loading);

export const selectEmployeeError = createSelector(selectEmployeeState, (state) => state.error);
