import { z } from 'zod';

import { ERROR_MESSAGES } from './consts';

const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_REGEX = /^@[a-zA-Z0-9_]{4,31}$/;
const STUDY_GROUP_REGEX = /^[а-яА-ЯёЁa-zA-Z0-9]{1,10}-\d{1,4}[а-яА-ЯёЁa-zA-Z]?$/;
const PASSPORT_REGEX = /^\d{4}\s?\d{6}$/;
const PHONE_REGEX = /^(\+7|8)\d{10}$/;

export const registrationFormSchema = z
  .object({
    fullName: z
      .string()
      .min(1, ERROR_MESSAGES.required)
      .min(2, ERROR_MESSAGES.nameTooShort)
      .max(100, ERROR_MESSAGES.nameTooLong)
      .regex(NAME_REGEX, ERROR_MESSAGES.nameInvalidChars),

    isNotBmstuStudent: z.boolean(),

    universityName: z.string(),
    passport: z.string(),
    phone: z.string(),

    email: z
      .string()
      .min(1, ERROR_MESSAGES.required)
      .regex(EMAIL_REGEX, ERROR_MESSAGES.emailInvalid),

    studyGroup: z.string(),

    telegram: z
      .string()
      .min(1, ERROR_MESSAGES.required)
      .regex(TELEGRAM_REGEX, ERROR_MESSAGES.telegramInvalid),

    activities: z
      .array(z.string())
      .min(1, ERROR_MESSAGES.activitiesRequired),

    agreeToDataProcessing: z
      .boolean()
      .refine((value) => value, ERROR_MESSAGES.agreementRequired),
  })
  .superRefine((data, ctx) => {
    if (data.isNotBmstuStudent) {
      if (data.universityName.trim().length < 2) {
        ctx.addIssue({
          code: 'custom',
          path: ['universityName'],
          message: ERROR_MESSAGES.required,
        });
      }

      if (!PASSPORT_REGEX.test(data.passport.trim())) {
        ctx.addIssue({
          code: 'custom',
          path: ['passport'],
          message: ERROR_MESSAGES.passportInvalid,
        });
      }

      if (!PHONE_REGEX.test(data.phone.trim())) {
        ctx.addIssue({
          code: 'custom',
          path: ['phone'],
          message: ERROR_MESSAGES.phoneInvalid,
        });
      }
    } else if (!STUDY_GROUP_REGEX.test(data.studyGroup.trim())) {
      ctx.addIssue({
        code: 'custom',
        path: ['studyGroup'],
        message: ERROR_MESSAGES.studyGroupInvalid,
      });
    }
  });

export const registrationRequestSchema = registrationFormSchema.transform(
  (data) => ({
    full_name: data.fullName.trim(),
    is_bmstu_student: !data.isNotBmstuStudent,
    university_name: data.isNotBmstuStudent ? data.universityName.trim() : null,
    passport: data.isNotBmstuStudent ? data.passport.trim() : null,
    phone: data.isNotBmstuStudent ? data.phone.trim() : null,
    email: data.email.trim(),
    study_group: data.isNotBmstuStudent ? null : data.studyGroup.trim(),
    telegram: data.telegram.trim(),
    activities: data.activities,
    agree_data_processing: data.agreeToDataProcessing,
  }),
);

export const registrationResponseSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'confirmed', 'rejected']),
  created_at: z.string(),
});
