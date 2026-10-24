export enum AErrorCode {
  UNKNOWN = 'UNKNOWN',
  INVALID_REQUEST = 'INVALID_REQUEST',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
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
