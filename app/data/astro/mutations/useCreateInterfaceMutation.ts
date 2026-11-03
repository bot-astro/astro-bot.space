interface CreateInterfaceMutationParams {
  guild_id: string
  channel_id: string
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateInterfaceMutationParams) =>
      $astroApiClient.create_interface(params.guild_id, params.channel_id),
    onSuccess(data, variables) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
