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
}

export class AError extends Error {
  readonly code: AErrorCode

  constructor({ code, message }: AErrorResponse) {
    super(message ?? code)
    this.name = 'AError'
    this.code = code
  }
}
