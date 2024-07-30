import {guild_settings_qk, guilds_qk} from "~/data/astro/config/query-keys";

export function useGuildSettings(guild_id: string) {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guild_settings_qk(guild_id),
    queryFn: () => $astroApiClient.get_guild_settings(guild_id)
  })
}