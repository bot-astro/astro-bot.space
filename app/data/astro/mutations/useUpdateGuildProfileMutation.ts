import type { GuildProfileRB } from '~/types/guild-settings/request-bodies/guild_profile_rb'
import type { GuildSettings } from '~/types/guild-settings/guild_settings'

interface UpdateGuildProfileMutationParams {
  guild_id: string
  profile_rb: GuildProfileRB
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateGuildProfileMutationParams) =>
      $astroApiClient.update_guild_profile(params.guild_id, params.profile_rb),
    onSuccess(_, variables) {
      // the endpoint returns nothing, so the cached settings are patched locally
      queryClient.setQueryData<GuildSettings>(
        guild_settings_qk(variables.guild_id),
        (old) => (old ? { ...old, ...variables.profile_rb } : old),
      )
    },
  })
}
