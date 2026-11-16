export enum AErrorCode {
  UNKNOWN = 'UNKNOWN',
  INVALID_REQUEST = 'INVALID_REQUEST',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  PREMIUM_REQUIRED = 'PREMIUM_REQUIRED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  TRANSLATION = 'TRANSLATION',
  BOT_NOT_IN_GUILD = 'BOT_NOT_IN_GUILD',
}

export interface AErrorResponse {
  code: AErrorCode
  message?: string | null
  retryAfterSeconds?: number
}

export class AError extends Error {
  readonly code: AErrorCode
  readonly retryAfterSeconds?: number

  constructor({
    code,
    message,
    retryAfterSeconds,
    cause,
  }: AErrorResponse & { cause?: unknown }) {
    super(message ?? code, { cause })
    this.name = 'AError'
    this.code = code
    this.retryAfterSeconds = retryAfterSeconds
  }
}
