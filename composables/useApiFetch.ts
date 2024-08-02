import {AstroApiError} from "~/data/astro/core/AstroApiError";
import {AstroApiErrorCode} from "~/data/astro/core/AstroApiErrorCode";
import {FetchError} from "ofetch";

/**
 * Custom $fetch for interacting with Astro APIs
 *
 * @throws AstroApiError if redirect_on_401 is true and the response status code is 401
 * @throws Error for other kind of errors
 */
export async function useApiFetch<T>(
  url: string,
  options: Parameters<typeof $fetch<T>>[1] = {},
  redirect_on_401: boolean = true,
) {
  try {
    const res = await $fetch<T>(url, {
      ...options,
      credentials: 'include',
      cache: 'no-cache',
      retry: false,
      // headers: {
      //   ...(options?.headers ?? {}),
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      // }
    })

    return {
      data: res,
      error: undefined
    }
  } catch (e) {
    console.error(e)

    if (e instanceof FetchError) {
        if (e.statusCode === 401 && redirect_on_401) {
          useAuth().login(useRoute().fullPath)
          throw new AstroApiError(AstroApiErrorCode.UNAUTHENTICATED)
        } else {
          return {
            data: undefined,
            error: e
          }
        }
    } else {
      throw e
    }
  }
}

/**
 * Custom useFetch for interacting with Astro APIs
 *
 * @throws AstroApiError if redirect_on_401 is true and the response status code is 401
 */
// export async function useApiFetch<T>(
//   url: string | (() => string),
//   options: UseFetchOptions<T> = {},
//   redirect_on_401: boolean = true,
// ) {
//   const config = useRuntimeConfig()
//
//   const res = await useFetch(url, {
//     ...options,
//     credentials: 'include',
//     cache: "no-cache", // cache handled by vue-query
//     retry: false, // retries are handled by vue-query
//     headers: {
//       ...options.headers,
//       'Content-Type': 'application/json'
//     }
//   })
//
//   console.log(res)
//
//   // if (res.error.value?.status == 401 && redirect_on_401) {
//   //   useAuth().login(useRoute().fullPath)
//   //   throw new AstroApiError(AstroApiErrorCode.UNAUTHENTICATED)
//   // }
//
//   return res
// }