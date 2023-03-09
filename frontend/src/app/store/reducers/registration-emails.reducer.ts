import { createReducer, on } from '@ngrx/store';
import { RegistrationEmail } from '../../models/registration-email';
import { RegistrationEmailActions } from '../actions/registration-emails.action';
// State is immutable
export const initialState: RegistrationEmail[] = [];

// Reducer determines new state based on Action type
export const registrationEmailReducer = createReducer(
  // Initial State
  initialState,
  // On will handle dispatched actions to deduce new state from old state   
  on(RegistrationEmailActions.getAllRegistrationEmails, (state, { registrationsEmails }) => (console.log("get"),registrationsEmails)),
  on(RegistrationEmailActions.addRegistrationEmail, (state, { registrationEmail }) => (console.log("add"), [...state, registrationEmail])),
  on(RegistrationEmailActions.resendRegistrationEmail, (state, { registrationEmail }) => (console.log("resend"),state.map((each) => each._id === registrationEmail._id ? registrationEmail : each))),
  on(RegistrationEmailActions.updateRegistrationEmail, (state, { registrationEmail }) => state.map((each) => each._id === registrationEmail._id ? registrationEmail : each)),
  on(RegistrationEmailActions.deleteRegistrationEmail, (state, { registrationEmail }) => state.filter((each) => each._id !== registrationEmail._id)),
);