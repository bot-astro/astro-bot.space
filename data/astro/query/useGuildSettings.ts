import {guild_settings_qk} from "~/data/astro/config/query-keys";
import type {Ref} from "vue";

export function useGuildSettings(guild_id: Ref<string | undefined>) {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guild_settings_qk(guild_id),
    queryFn: (context) => {
      if (context.queryKey[1] === undefined || context.queryKey[1] === null) {
        throw Error('guild_id is undefined')
      } else {
        return $astroApiClient.get_guild_settings(context.queryKey[1])
      }
    }
  })
}