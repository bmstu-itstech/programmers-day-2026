import { makeAutoObservable, runInAction } from 'mobx';

import type {
  FieldError,
  RegistrationFormData,
  RegistrationFormField,
} from '@/entities/registration';
import {
  registrationFormSchema,
  registrationRequestSchema,
} from '@/entities/registration';
import { registrationApi } from '@/entities/registration/api/registrationApi';
import { getUtmSource } from '@/shared/lib/utm';

type FormStatus = 'idle' | 'submitting' | 'error';

const initialFormData: RegistrationFormData = {
  fullName: '',
  isNotBmstuStudent: false,
  universityName: '',
  passport: '',
  phone: '',
  email: '',
  studyGroup: '',
  telegram: '',
  activities: [],
  agreeToDataProcessing: false,
};

const NON_BMSTU_FIELDS: RegistrationFormField[] = ['universityName', 'passport', 'phone'];
const BMSTU_FIELDS: RegistrationFormField[] = ['studyGroup'];

export class RegistrationStore {
  formData: RegistrationFormData = { ...initialFormData };
  errors: FieldError[] = [];
  status: FormStatus = 'idle';
  submitError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isSubmitting(): boolean {
    return this.status === 'submitting';
  }

  get canSubmit(): boolean {
    return this.formData.agreeToDataProcessing && !this.isSubmitting;
  }

  getFieldError(field: RegistrationFormField): string | undefined {
    return this.errors.find((error) => error.field === field)?.message;
  }

  setField<K extends RegistrationFormField>(
    field: K,
    value: RegistrationFormData[K],
  ): void {
    this.formData[field] = value;
    this.clearFieldError(field);

    if (field === 'isNotBmstuStudent') {
      const staleFields = value ? BMSTU_FIELDS : NON_BMSTU_FIELDS;
      this.errors = this.errors.filter(
        (error) => !staleFields.includes(error.field as RegistrationFormField),
      );
    }
  }

  toggleActivity(activity: string): void {
    const index = this.formData.activities.indexOf(activity);
    if (index >= 0) {
      this.formData.activities.splice(index, 1);
    } else {
      this.formData.activities.push(activity);
    }
    this.clearFieldError('activities');
  }

  clearFieldError(field: RegistrationFormField): void {
    this.errors = this.errors.filter((error) => error.field !== field);
  }

  clearAllErrors(): void {
    this.errors = [];
    this.submitError = null;
  }

  validate(): boolean {
    const result = registrationFormSchema.safeParse(this.formData);

    if (result.success) {
      this.errors = [];
      return true;
    }

    this.errors = result.error.issues.map((issue) => ({
      field: String(issue.path[0] ?? ''),
      message: issue.message,
    }));
    return false;
  }

  async submit(): Promise<boolean> {
    this.clearAllErrors();

    if (!this.validate()) {
      return false;
    }

    this.status = 'submitting';

    try {
      const payload = registrationRequestSchema.parse({
        ...this.formData,
        source: getUtmSource(),
      });
      await registrationApi.submitRegistration(payload);

      runInAction(() => {
        this.status = 'idle';
      });
      return true;
    } catch (error) {
      runInAction(() => {
        this.status = 'error';
        this.submitError =
          error instanceof Error ? error.message : 'Произошла ошибка при отправке';
      });
      return false;
    }
  }

  reset(): void {
    this.formData = { ...initialFormData, activities: [] };
    this.errors = [];
    this.status = 'idle';
    this.submitError = null;
  }
}
