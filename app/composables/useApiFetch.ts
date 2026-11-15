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
      // built here instead of in the catch: an `instanceof FetchError` check is false on the ssr worker (nitro bundles its own ofetch), which turned a 401 into UNKNOWN and a 500 page
      onResponseError: ({ response }) => {
        const data: AErrorResponse | undefined = response._data
        throw new AError({
          code: data?.code ?? AErrorCode.UNKNOWN,
          message: data?.message,
        })
      },
    })) as T
  } catch (error) {
    if (error instanceof AError) throw error

    throw new AError({ code: AErrorCode.UNKNOWN, cause: error })
  }
}
