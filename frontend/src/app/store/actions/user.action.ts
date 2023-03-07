import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../models/user';

export const UserAction = createActionGroup({
  // Defines which page/component is using which slice of state
  source: '[User] Current User',
  // Group of Actions (type: payload)
  events: {
    'Set Current User': props<{ user: User }>(),
    // 'Add User': props<{ user: User }>(),
    // 'Delete User': props<{ index: number }>(),
  },
});
