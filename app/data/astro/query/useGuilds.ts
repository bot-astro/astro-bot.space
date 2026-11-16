import { guilds_qk } from '~/data/astro/config/query-keys'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import type { DiscordGuild } from '~/types/discord'

export function useGuilds() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guilds_qk,
    queryFn: (): Promise<DiscordGuild[]> => {
      return $astroApiClient.get_guilds()
    },
    // discord rate limits the guilds fetch (429), the list rarely changes and the refresh button on /guilds still forces a refetch
    staleTime: 600000,
    // keep it past unmount (default is 5 min), otherwise staleTime is lost when navigating away
    gcTime: 600000,
    // a rate limited request is retried once, after the delay Discord asked for (more retries only extend the rate limit)
    retry: (failureCount, error): boolean => {
      if (
        error instanceof AError &&
        error.code === AErrorCode.TOO_MANY_REQUESTS
      )
        return failureCount < 1

      return failureCount < 3
    },
    retryDelay: (failureCount, error) =>
      error instanceof AError && error.retryAfterSeconds
        ? Math.min(error.retryAfterSeconds, 30) * 1000
        : Math.min(1000 * 2 ** failureCount, 30000),
  })
}
