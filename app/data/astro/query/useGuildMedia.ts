import type { Ref } from 'vue'
import { guild_media_qk } from '~/data/astro/config/query-keys'

export function useGuildMedia(guild_id: Ref<string | undefined>) {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guild_media_qk(guild_id),
    // only changed by our own mutations, which update the cache
    staleTime: 300000,
    queryFn: (context) => {
      if (context.queryKey[1] === undefined) {
        throw Error('guild_id is undefined')
      } else {
        return $astroApiClient.get_media(context.queryKey[1] as string)
      }
    },
  })
}
