import { createActionGroup, props } from '@ngrx/store';
import { RegistrationEmail } from '../../models/registration-email';

export const RegistrationEmailActions = createActionGroup({
  // Defines which page/component is using which slice of state
  source: '[RegistrationEmails]',
  // Group of Actions (type: payload)
  events: {
    'Get All Registration Emails': props<{ registrationsEmails: RegistrationEmail[]}>(),
    'Add Registration Email': props<{ registrationEmail: RegistrationEmail}>(),
    'Resend Registration Email': props<{ registrationEmail: RegistrationEmail}>(),
    'Update Registration Email': props<{ registrationEmail: RegistrationEmail}>(),
    'Delete Registration Email': props<{ registrationEmail: RegistrationEmail}>(),
  },
});