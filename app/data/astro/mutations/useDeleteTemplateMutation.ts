interface DeleteTemplateMutationParams {
  guild_id: string
  template_id: string
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteTemplateMutationParams) => $astroApiClient.delete_template(params.guild_id, params.template_id),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}