interface DeleteGeneratorMutationParams {
  guild_id: string
  generator_id: string
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteGeneratorMutationParams) => $astroApiClient.delete_generator(params.guild_id, params.generator_id),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}