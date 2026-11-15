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
    // no `instanceof FetchError`: on the ssr worker $fetch comes from nitro's own ofetch copy, so the check is false and a 401 became UNKNOWN (500 page)
    const fetch_error = error as {
      data?: AErrorResponse
      response?: { status?: number }
    }
    const data = fetch_error?.data
    const code =
      data?.code ??
      (fetch_error?.response?.status === 401
        ? AErrorCode.UNAUTHENTICATED
        : AErrorCode.UNKNOWN)
    throw new AError({
      code,
      message: data?.message,
      cause: error,
    })
  }
}
