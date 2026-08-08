import type { z } from 'zod';

export function validateDTO<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.warn('[api] DTO validation failed:', result.error);
    return data as T;
  }

  return result.data;
}
