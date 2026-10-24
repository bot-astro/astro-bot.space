import { user_qk } from '~/data/astro/config/query-keys'
import { AError, AErrorCode } from '~/data/astro/core/AError'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  try {
    await queryClient.query({
      queryKey: user_qk,
      queryFn: () => $astroApiClient.get_self_user(),
      retry: false,
    })
  } catch (error) {
    if (error instanceof AError && error.code === AErrorCode.UNAUTHENTICATED) {
      return useAuth().login(_to.fullPath)
    }

    throw error
  }
})
