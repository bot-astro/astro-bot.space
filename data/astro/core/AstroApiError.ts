import type {AstroApiErrorCode} from "~/data/astro/core/AstroApiErrorCode";

export class AstroApiError extends Error {
  public readonly code: AstroApiErrorCode;

  constructor(code: AstroApiErrorCode) {
    super(code);
    this.code = code;
  }
}