
import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: () => 'Required field.',
  email: () => 'Invalid email address.'
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
