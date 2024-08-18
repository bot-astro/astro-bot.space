import type {Ref} from "vue";
import {guild_roles_qk} from "~/data/astro/config/query-keys";

export function useGuildRoles(guild_id: Ref<string | undefined>) {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guild_roles_qk(guild_id),
    queryFn: (context) => {
      if (context.queryKey[1] === undefined) {
        throw Error('guild_id is undefined')
      } else {
        return $astroApiClient.get_guild_roles(context.queryKey[1])
      }
    }
  })
}