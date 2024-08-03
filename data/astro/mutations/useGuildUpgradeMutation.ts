import {useMutation} from "#imports";

export interface GuildUpgradeMutationParams {
  guild_id: string
  subscription_id: string
}

export function useGuildUpgradeMutation() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: GuildUpgradeMutationParams) => $astroApiClient.upgrade_guild(params.guild_id, params.subscription_id),
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: guild_settings_qk(variables.guild_id) })
    },
  })
}