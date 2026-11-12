import { guilds_qk } from '~/data/astro/config/query-keys'
import type { DiscordGuild } from '~/types/discord'

export function useGuilds() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guilds_qk,
    queryFn: (): Promise<DiscordGuild[]> => {
      return $astroApiClient.get_guilds()
    },
    staleTime: 300000,
  })
}
