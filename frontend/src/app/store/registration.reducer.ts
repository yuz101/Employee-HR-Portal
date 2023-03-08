import { createReducer, on } from '@ngrx/store';
import { RegistrationEmail } from '../models/registration-email';
import { RegistrationEmailAction } from './registration.action';
// State is immutable
export const initialState: RegistrationEmail[] = [];

// Reducer determines new state based on Action type
export const userReducer = createReducer(
  // Initial State
  initialState,
  // On will handle dispatched actions to deduce new state from old state   
  on(RegistrationEmailAction.getAllRegistration, (state, { registrations }) => registrations),
  on(RegistrationEmailAction.addRegistration, (state, { registration }) => ({...state, registration})),
  on(RegistrationEmailAction.updateRegistration, (state, { registration }) => state.map((each) => each._id === registration._id ? registration : each)),
  on(RegistrationEmailAction.deleteRegistration, (state, { registration }) => state.filter((each) => each._id !== registration._id)),
);