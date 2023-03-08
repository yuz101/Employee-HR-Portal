import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EmployeeWorkAuthorizationStatusRecord } from 'src/app/models/work-authorization-status';

export const selectEmployeeWorkAuthorizationStatusRecords
    = createFeatureSelector<EmployeeWorkAuthorizationStatusRecord[]>('employeeWorkAuthorizationStatusRecords');