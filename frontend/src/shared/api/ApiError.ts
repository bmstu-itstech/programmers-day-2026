export class ApiError extends Error {
  public readonly status?: number;

  constructor(
    message: string,
    options?: {
      status?: number;
      cause?: unknown;
    },
  ) {
    super(message, { cause: options?.cause });
    this.name = 'ApiError';
    this.status = options?.status;
  }
}
