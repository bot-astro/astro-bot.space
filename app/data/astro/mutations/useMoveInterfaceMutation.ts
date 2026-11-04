interface MoveInterfaceMutationParams {
  guild_id: string
  interface_id: string
  channel_id: string
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: MoveInterfaceMutationParams) =>
      $astroApiClient.move_interface(
        params.guild_id,
        params.interface_id,
        params.channel_id,
      ),
    onSuccess(data, variables) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
