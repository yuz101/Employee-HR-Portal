import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee } from '../../models/employee';

export const selectProfile = createFeatureSelector<Employee>('profile');