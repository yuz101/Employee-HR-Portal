import { createReducer, on } from '@ngrx/store';
import { UserAction } from '../actions/user.action';
import { User } from '../../models/user';

// State is immutable
export const initialState: User = {
  jwt: '',
};

// Reducer determines new state based on Action type
export const userReducer = createReducer(
  // Initial State
  initialState,
  // On will handle dispatched actions to deduce new state from old state
  on(UserAction.setCurrentUser, (state, { user }) => user),
);
