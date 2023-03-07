import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/employee';

export const GetProfiles = createAction('[Employee/API] Get Profiles');

export const GetProfilesSuccess = createAction(
  '[Employee/API] Get Profiles Success',
  props<{ employees: Employee[] }>(),
);

export const GetProfilesFailure = createAction('[Employee/API] Get Profiles Failure', props<{ error: string }>());
