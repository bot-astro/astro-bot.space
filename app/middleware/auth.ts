import { user_qk } from '~/data/astro/config/query-keys'
import { AError, AErrorCode } from '~/data/astro/core/AError'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const nuxtApp = useNuxtApp()
  const { $astroApiClient } = nuxtApp
  const queryClient = useQueryClient()

  try {
    const user = await queryClient.query({
      queryKey: user_qk,
      // restore the nuxt context: on ssr useApiFetch needs it to forward the cookie, and query-core can call queryFn outside of it
      queryFn: () =>
        nuxtApp.runWithContext(() => $astroApiClient.get_self_user()),
      retry: false,
      // don't block every navigation on a fresh /auth/me call
      staleTime: 120000,
    })

    // useUser (navbar) caches null for unauthenticated visitors under the same key, so a fresh cache hit can be a logged-out user
    if (!user) {
      return $astroApiClient.loginViaDiscord(_to.fullPath)
    }
  } catch (error) {
    if (error instanceof AError && error.code === AErrorCode.UNAUTHENTICATED) {
      // useAuth() can't be used here: the injection context is lost after the await
      return $astroApiClient.loginViaDiscord(_to.fullPath)
    }

    throw error
  }
})
