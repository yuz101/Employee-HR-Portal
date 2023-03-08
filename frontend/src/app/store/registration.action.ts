import { createActionGroup, props } from '@ngrx/store';
import { RegistrationEmail } from '../models/registration-email';

export const RegistrationEmailAction = createActionGroup({
  // Defines which page/component is using which slice of state
  source: '[RegistrationEmail]',
  // Group of Actions (type: payload)
  events: {
    'Get All Registration': props<{ registrations: RegistrationEmail[]}>(),
    'Add Registration': props<{ registration: RegistrationEmail}>(),
    'Update Registration': props<{ registration: RegistrationEmail}>(),
    'Delete Registration': props<{ registration: RegistrationEmail}>(),
  },
});