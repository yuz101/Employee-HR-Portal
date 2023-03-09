import { createActionGroup, props } from '@ngrx/store';
import { Employee } from '../../models/employee';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Retrieved Employee Profile': props<{profile: Employee }>(),
  },
});