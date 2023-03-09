import { Action, createReducer, on } from '@ngrx/store';
import { Employee } from '../../models/employee';
import { ProfileActions } from '../actions/profile.action';

export const initialState: Employee = {
  username: '',
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.retrievedEmployeeProfile, (state, { profile }) => profile)
);