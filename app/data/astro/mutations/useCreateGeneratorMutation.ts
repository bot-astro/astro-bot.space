interface CreateGeneratorMutationParams {
  guild_id: string
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateGeneratorMutationParams) => $astroApiClient.create_generator(params.guild_id),
    async onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
      await queryClient.invalidateQueries({ queryKey: guild_channels_qk(variables.guild_id) })
    },
  })
}