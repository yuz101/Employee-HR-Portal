import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';
// import { EmployeeState } from './employee.reducer';
import { Employee } from '../models/employee';

export const selectEmployees = createFeatureSelector<Employee[]>('employees');

// export const selectEmployeeState = (state: AppState) => state.employee;

// export const selectAllEmployees = createSelector(
//   selectEmployeeState,
//   (state: EmployeeState) => state.employees
// );

// export const selectEmployeeById = (id: string) => createSelector(
//   selectAllEmployees,
//   (employees) => employees.find((employee) => employee._id === id)
// );


// export const selectEmployees = createSelector(
//   selectEmployeeState,
//   (state: EmployeeState) => {
//     console.log('employees selector called with state:', state);
//     return state.employees;
//   }
// );




