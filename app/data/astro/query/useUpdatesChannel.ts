import type { Ref } from 'vue'
import { guild_updates_channel_qk } from '~/data/astro/config/query-keys'

export function useUpdatesChannel(guild_id: Ref<string | undefined>) {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guild_updates_channel_qk(guild_id),
    // the bot can mark the webhook as missing when an alert fails
    staleTime: 30000,
    queryFn: (context) => {
      if (context.queryKey[1] === undefined || context.queryKey[1] === null) {
        throw Error('guild_id is undefined')
      } else {
        return $astroApiClient.get_updates_channel(
          context.queryKey[1] as string,
        )
      }
    },
  })
}
