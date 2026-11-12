import type { GSInterface } from '~/types/guild-settings/interface'

interface UpdateInterfaceMutationParams {
  guild_id: string
  interface_id: string
  interface_settings: GSInterface
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateInterfaceMutationParams) =>
      $astroApiClient.update_interface(
        params.guild_id,
        params.interface_id,
        params.interface_settings,
      ),
    onSuccess(data, variables) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
