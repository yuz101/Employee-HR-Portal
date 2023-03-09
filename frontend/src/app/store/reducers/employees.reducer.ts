// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { createReducer, on } from '@ngrx/store';
// import { Employee } from '../models/employee';
// import { loadEmployees, loadEmployeesSuccess, loadEmployeesFailure } from './employee.action';
// import { Action } from '@ngrx/store';

// export interface EmployeeState {
//   employees: Employee[];
// }


// export const initialState: EmployeeState = {
//   employees: []
// };

// // const employeeReducer = createReducer(
// //   initialState,
// //   on(loadEmployeesSuccess, (state, { employees }) => ({ ...state, employees }))
// // );

// export const employeeReducer = createReducer(
//   initialState,
//   on(loadEmployeesSuccess, (state, { employees }) => {
//     console.log('loadEmployeesSuccess reducer called with employees:', employees);
//     return { ...state, employees };
//   })
// );


import { Action, createReducer, on } from '@ngrx/store';
import { EmployeeApiActions } from '../actions/employees.action';
import { Employee } from '../../models/employee';

export const initialState: Employee[] = [];

// export const employeesReducer = createReducer(
//   initialState,
//   on(EmployeeApiActions.retrievedEmployeesProfiles, (state, { employees }) => employees)
// );

export const employeesReducer = createReducer(
  initialState,
  on(EmployeeApiActions.retrievedEmployeesProfiles, (state, { employees }) => {
    return state.concat(employees);
  })
);


// export interface EmployeeState {
//   employees: Employee[];
// }

// export const initialState: EmployeeState = {
//   employees: []
// };

// export const employeeReducer = createReducer(
//   initialState,
//   on(loadEmployeesSuccess, (state, { employees }) => {
//     return { ...state, employees };
//   })
// );

// export function reducer(state: EmployeeState | undefined, action: Action) {
//   return employeeReducer(state, action);
// }
