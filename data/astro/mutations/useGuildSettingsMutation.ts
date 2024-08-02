import type {GuildSettingsRB} from "~/types/guild-settings/request-bodies/guild_settings_rb";
import {guild_settings_qk} from "~/data/astro/config/query-keys";

export interface GuildSettingsMutationParams {
  guild_id: string
  guild_settings_rb: GuildSettingsRB
}

export function useGuildSettingsMutation() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: GuildSettingsMutationParams) => $astroApiClient.update_guild_settings(params.guild_id, params.guild_settings_rb),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}