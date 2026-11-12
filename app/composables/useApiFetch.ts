import { FetchError } from 'ofetch'
import {
  AError,
  AErrorCode,
  type AErrorResponse,
} from '~/data/astro/core/AError'

/** Returns the response body, or throws an AError on failure. */
export async function useApiFetch<T>(
  url: string,
  options: Parameters<typeof $fetch<T>>[1] = {},
): Promise<T> {
  try {
    return (await $fetch<T>(url, {
      ...options,
      // cloudflare workers' fetch throws on the `cache` field, so only set this in the browser
      ...(import.meta.client ? { credentials: 'include' as const } : {}),
      retry: false,
      headers: {
        ...options.headers,
        // this way auth cookie gets sent during ssr too!
        ...(import.meta.server ? useRequestHeaders(['cookie']) : {}),
      },
    })) as T
  } catch (error) {
    const data: AErrorResponse | undefined =
      error instanceof FetchError ? error.data : undefined
    throw new AError({
      code: data?.code ?? AErrorCode.UNKNOWN,
      message: data?.message,
    })
  }
}
