import type { z } from 'zod';

import type {
  registrationFormSchema,
  registrationRequestSchema,
  registrationResponseSchema,
} from './schemas';

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
export type RegistrationRequest = z.infer<typeof registrationRequestSchema>;
export type RegistrationResponse = z.infer<typeof registrationResponseSchema>;

export type RegistrationFormField = keyof RegistrationFormData;

export interface FieldError {
  field: string;
  message: string;
}
