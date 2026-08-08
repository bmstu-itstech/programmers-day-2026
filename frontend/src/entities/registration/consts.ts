export const ACTIVITY_OPTIONS = [
  { value: 'expo', label: 'Стендовую выставку компаний-партнёров' },
  { value: 'lectures', label: 'Лекции/мастер-классы' },
  { value: 'concert', label: 'Концерт приглашённого хедлайнера' },
] as const;

export const AGREEMENT_LABEL =
  'Я даю своё согласие на обработку моих персональных данных в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ "О персональных данных"';

export const ERROR_MESSAGES = {
  required: 'Обязательное поле',
  nameTooShort: 'Минимум 2 символа',
  nameTooLong: 'Максимум 100 символов',
  nameInvalidChars: 'Только буквы, пробелы и дефисы',
  emailInvalid: 'Некорректный email',
  telegramInvalid: 'Некорректная ссылка, формат: @username',
  studyGroupInvalid: 'Некорректная учебная группа, пример: ИУ7-12Б',
  passportInvalid: 'Формат: 1234 567890',
  phoneInvalid: 'Формат: 89991234567',
  activitiesRequired: 'Выберите хотя бы одну активность',
  agreementRequired: 'Необходимо согласие на обработку персональных данных',
} as const;
