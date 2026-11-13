import { guild_settings_qk } from '~/data/astro/config/query-keys'
import type { Ref } from 'vue'
import { AError, AErrorCode } from '~/data/astro/core/AError'

export function useGuildSettings(guild_id: Ref<string | undefined>) {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guild_settings_qk(guild_id),
    // every mutation writes the server response into the cache, so only changes made by the bot are missed
    staleTime: 60000,
    queryFn: (context) => {
      if (context.queryKey[1] === undefined || context.queryKey[1] === null) {
        throw Error('guild_id is undefined')
      } else {
        return $astroApiClient.get_guild_settings(context.queryKey[1] as string)
      }
    },
    retry: (failureCount, error): boolean => {
      if (failureCount > 2) return false

      if (
        error instanceof AError &&
        error.code === AErrorCode.BOT_NOT_IN_GUILD &&
        guild_id.value
      ) {
        return false
      }

      return true
    },
  })
}
