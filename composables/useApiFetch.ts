import type { UseFetchOptions } from "#app";
import {AstroApiError} from "~/data/astro/core/AstroApiError";
import {AstroApiErrorCode} from "~/data/astro/core/AstroApiErrorCode";

/**
 * Custom useFetch for interacting with Astro APIs
 *
 * @throws AstroApiError if redirect_on_401 is true and the response status code is 401
 */
export async function useApiFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {},
  redirect_on_401: boolean = true,
) {
  const res = await useFetch(url, {
    ...options,
    credentials: 'include',
    cache: "no-cache", // cache handled by vue-query
    retry: false, // retries are handled by vue-query

  })

  // if (res.error.value?.status == 401 && redirect_on_401) {
  //   useAuth().login(useRoute().fullPath)
  //   throw new AstroApiError(AstroApiErrorCode.UNAUTHENTICATED)
  // }

  return res
}