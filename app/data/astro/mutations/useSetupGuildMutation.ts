interface SetupGuildMutationParams {
  guild_id: string
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SetupGuildMutationParams) =>
      $astroApiClient.setup_guild(params.guild_id),
    async onSuccess(data, variables) {
      queryClient.setQueryData(
        guild_settings_qk(variables.guild_id),
        data.guild_settings,
      )
      await queryClient.invalidateQueries({
        queryKey: guild_channels_qk(variables.guild_id),
      })
    },
  })
}
