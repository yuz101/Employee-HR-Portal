import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EmployeeCurrentWorkAuthorizationStatusRecord } from 'src/app/models/work-authorization-status';

export const selectEmployeeWorkAuthorizationStatusRecords
    = createFeatureSelector<EmployeeCurrentWorkAuthorizationStatusRecord[]>('employeeWorkAuthorizationStatusRecords');