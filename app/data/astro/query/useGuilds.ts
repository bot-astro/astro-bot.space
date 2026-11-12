import { guilds_qk } from '~/data/astro/config/query-keys'
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
  })
}
