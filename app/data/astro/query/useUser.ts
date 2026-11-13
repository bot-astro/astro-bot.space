import { AError, AErrorCode } from '~/data/astro/core/AError'
import { user_qk } from '../config/query-keys'

export function useUser() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    enabled: import.meta.client,
    queryKey: user_qk,
    // same as the auth middleware, otherwise the navbar refetches right after the middleware
    staleTime: 120000,
    queryFn: async () => {
      try {
        return await $astroApiClient.get_self_user()
      } catch (error) {
        if (
          error instanceof AError &&
          error.code === AErrorCode.UNAUTHENTICATED
        ) {
          return null
        }

        throw error
      }
    },
  })
}
