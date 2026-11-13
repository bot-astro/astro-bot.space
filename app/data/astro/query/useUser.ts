import { user_qk } from '../config/query-keys'

export function useUser() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    enabled: import.meta.client,
    queryKey: user_qk,
    // same as the auth middleware, otherwise the navbar refetches right after the middleware
    staleTime: 120000,
    // null when unauthenticated
    queryFn: () => $astroApiClient.get_self_user(),
  })
}
