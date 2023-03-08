import { createAction, createActionGroup, props } from '@ngrx/store';
import { Employee } from '../models/employee';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';

export const EmployeeApiActions = createActionGroup({
  source: 'Employees API',
  events: {
    'Retrieved Employees Profiles': props<{employees: Employee[] }>(),
  },
});

// export const loadEmployees = createAction('[Employee/API] Load Employees');

// export const loadEmployeesSuccess = createAction(
//   '[Employee API] Load Success',
//   props<{ employees: Employee[] }>()
// );

// export const loadEmployeesFailure = createAction(
//   '[Employee API] Load Failure',
//   props<{ error: string }>()
// );

// export const employeeAdapter = createEntityAdapter<Employee>({
//   selectId: (employee: Employee) => employee._id,
// });

// export interface State extends EntityState<Employee> {
//   loading: boolean;
//   error: string | null;
// }

// export const initialState: State = employeeAdapter.getInitialState({
//   loading: false,
//   error: null,
// });
