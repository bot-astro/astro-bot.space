import {
  guild_channels_qk,
  guild_settings_qk,
} from '~/data/astro/config/query-keys'
import type { UpdatesChannelRB } from '~/types/guild-settings/request-bodies/updates_channel_rb'

interface UpdateUpdatesChannelMutationParams {
  guild_id: string
  updates_channel_rb: UpdatesChannelRB
}

export function useUpdateUpdatesChannelMutation() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateUpdatesChannelMutationParams) =>
      $astroApiClient.update_updates_channel(
        params.guild_id,
        params.updates_channel_rb,
      ),
    async onSuccess(data, variables) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
      // a channel may have been created
      await queryClient.invalidateQueries({
        queryKey: guild_channels_qk(variables.guild_id),
      })
    },
  })
}
