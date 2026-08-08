import { observer } from 'mobx-react-lite';

import { ACTIVITY_OPTIONS, AGREEMENT_LABEL } from '@/entities/registration';
import { navigate, ROUTES } from '@/shared/lib/router';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Field } from '@/shared/ui/Field/Field';
import { Input } from '@/shared/ui/Input/Input';
import { Shell } from '@/shared/ui/Shell/Shell';

import { useRegistrationStore } from './RegistrationStoreContext';

import styles from './RegistrationForm.module.css';

export const RegistrationForm = observer(function RegistrationForm() {
  const store = useRegistrationStore();
  const formData = store.formData;
  const isNotBmstuStudent = formData.isNotBmstuStudent;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await store.submit();
    if (success) {
      navigate(ROUTES.success);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Field label="ФИО" required error={store.getFieldError('fullName')}>
        <Input
          name="fullName"
          placeholder="Бауман Николай Эрнестович"
          autoComplete="name"
          value={formData.fullName}
          onChange={(e) => store.setField('fullName', e.target.value)}
          hasError={Boolean(store.getFieldError('fullName'))}
        />
      </Field>

      <Shell>
        <Checkbox
          name="isNotBmstuStudent"
          label="Я НЕ являюсь студентом МГТУ им. Н.Э. Баумана"
          checked={isNotBmstuStudent}
          onChange={(checked) => store.setField('isNotBmstuStudent', checked)}
        />
      </Shell>

      {isNotBmstuStudent && (
        <>
          <Field
            label="Название университета"
            required
            error={store.getFieldError('universityName')}
          >
            <Input
              name="universityName"
              placeholder="МГУ им. М.В. Ломоносова"
              autoComplete="organization"
              value={formData.universityName}
              onChange={(e) => store.setField('universityName', e.target.value)}
              hasError={Boolean(store.getFieldError('universityName'))}
            />
          </Field>

          <Field
            label="Серия и номер паспорта"
            required
            error={store.getFieldError('passport')}
          >
            <Input
              name="passport"
              placeholder="1234 567890"
              inputMode="numeric"
              value={formData.passport}
              onChange={(e) => store.setField('passport', e.target.value)}
              hasError={Boolean(store.getFieldError('passport'))}
            />
          </Field>

          <Field
            label="Номер телефона"
            required
            error={store.getFieldError('phone')}
          >
            <Input
              name="phone"
              type="tel"
              placeholder="89991234567"
              autoComplete="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => store.setField('phone', e.target.value)}
              hasError={Boolean(store.getFieldError('phone'))}
            />
          </Field>
        </>
      )}

      <Field
        label="Электронная почта"
        required
        error={store.getFieldError('email')}
      >
        <Input
          name="email"
          type="email"
          placeholder="studsovet_iu@yandex.ru"
          autoComplete="email"
          inputMode="email"
          value={formData.email}
          onChange={(e) => store.setField('email', e.target.value)}
          hasError={Boolean(store.getFieldError('email'))}
        />
      </Field>

      {!isNotBmstuStudent && (
        <Field
          label="Учебная группа"
          required
          error={store.getFieldError('studyGroup')}
        >
          <Input
            name="studyGroup"
            placeholder="ИУ7-12Б"
            value={formData.studyGroup}
            onChange={(e) => store.setField('studyGroup', e.target.value)}
            hasError={Boolean(store.getFieldError('studyGroup'))}
          />
        </Field>
      )}

      <Field
        label="Ссылка на телеграмм"
        required
        error={store.getFieldError('telegram')}
      >
        <Input
          name="telegram"
          placeholder="@studsovet_iu"
          value={formData.telegram}
          onChange={(e) => store.setField('telegram', e.target.value)}
          hasError={Boolean(store.getFieldError('telegram'))}
        />
      </Field>

      <Field
        label="Какие активности хотел бы посетить"
        required
        error={store.getFieldError('activities')}
      >
        <Shell hasError={Boolean(store.getFieldError('activities'))}>
          <div className={styles.activities}>
            {ACTIVITY_OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                name={`activity-${option.value}`}
                label={option.label}
                checked={formData.activities.includes(option.value)}
                onChange={() => store.toggleActivity(option.value)}
              />
            ))}
          </div>
        </Shell>
      </Field>

      <Field error={store.getFieldError('agreeToDataProcessing')}>
        <Checkbox
          name="agreeToDataProcessing"
          label={<span className={styles.agreementLabel}>{AGREEMENT_LABEL}</span>}
          checked={formData.agreeToDataProcessing}
          onChange={(checked) => store.setField('agreeToDataProcessing', checked)}
          hasError={Boolean(store.getFieldError('agreeToDataProcessing'))}
          align="top"
        />
      </Field>

      {store.submitError && (
        <div className={styles.submitError} role="alert">
          {store.submitError}
        </div>
      )}

      <Button type="submit" disabled={!store.canSubmit}>
        {store.isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </Button>
    </form>
  );
});
