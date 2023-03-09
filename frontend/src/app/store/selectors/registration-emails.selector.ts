import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegistrationEmail } from 'src/app/models/registration-email';

export const selectRegistrationEmails = createFeatureSelector<RegistrationEmail[]>('registrationEmails');