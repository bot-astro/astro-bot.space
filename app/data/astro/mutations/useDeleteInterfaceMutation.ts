interface DeleteInterfaceMutationParams {
  guild_id: string
  interface_id: string
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteInterfaceMutationParams) =>
      $astroApiClient.delete_interface(params.guild_id, params.interface_id),
    onSuccess(data, variables) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
