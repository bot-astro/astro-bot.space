import type { Ref } from 'vue'
import { guild_ai_usage_qk } from '~/data/astro/config/query-keys'

export function useAiUsage(guild_id: Ref<string | undefined>) {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guild_ai_usage_qk(guild_id),
    staleTime: 30000,
    queryFn: (context) => {
      if (context.queryKey[1] === undefined) {
        throw Error('guild_id is undefined')
      } else {
        return $astroApiClient.get_ai_usage(context.queryKey[1] as string)
      }
    },
  })
}
