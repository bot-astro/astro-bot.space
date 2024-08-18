import {guilds_qk} from "~/data/astro/config/query-keys";
import type {DiscordGuild} from "~/types/discord";

export function useGuilds() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guilds_qk,
    queryFn: (): Promise<DiscordGuild[]> => {
      // if (import.meta.dev) {
      //   return new Promise(resolve => setTimeout(async () => {
      //       let r = await import('~/guilds.json')
      //       resolve(r.default as DiscordGuild[])
      //     }, 1000)
      //   )
      // } else {
      // }
        return $astroApiClient.get_guilds()
    }
  })
}