import { ApiError } from '@/shared/api/ApiError';
import { post } from '@/shared/api/httpClient';
import { validateDTO } from '@/shared/api/validateDTO';

import { registrationResponseSchema } from '../schemas';
import type { RegistrationRequest, RegistrationResponse } from '../types';

const REGISTRATION_ENDPOINT = '/forms';

function mapErrorToMessage(status?: number): string {
  if (status === undefined) {
    return 'Нет соединения с сервером. Проверьте интернет и попробуйте ещё раз';
  }
  if (status === 409) {
    return 'Заявка с такими данными уже отправлена';
  }
  if (status === 429) {
    return 'Слишком много попыток. Попробуйте чуть позже';
  }
  if (status >= 500) {
    return 'Сервер временно недоступен. Попробуйте позже';
  }
  return 'Не удалось отправить заявку. Попробуйте ещё раз';
}

export const registrationApi = {
  async submitRegistration(
    payload: RegistrationRequest,
  ): Promise<RegistrationResponse> {
    try {
      const data = await post<unknown>(REGISTRATION_ENDPOINT, payload);
      return validateDTO(registrationResponseSchema, data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(mapErrorToMessage(error.status), { cause: error });
      }
      throw error;
    }
  },
};
