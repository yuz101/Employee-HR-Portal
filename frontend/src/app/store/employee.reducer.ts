import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Employee } from '../models/employee';
import { GetProfiles, GetProfilesSuccess, GetProfilesFailure } from './employee.action';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  error: string;
}

export const adapter = createEntityAdapter<Employee>();

export const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
  error: '',
});

const employeeReducer = createReducer(
  initialState,
  on(GetProfiles, (state) => ({ ...state, loading: true })),
  on(GetProfilesSuccess, (state, { employees }) => adapter.setAll(employees, { ...state, loading: false })),
  on(GetProfilesFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export function reducer(state: EmployeeState | undefined, action: Action) {
  return employeeReducer(state, action);
}
