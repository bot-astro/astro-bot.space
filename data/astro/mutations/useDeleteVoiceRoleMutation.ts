interface DeleteVoiceRoleMutationParams {
  guild_id: string
  channel_id: string
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteVoiceRoleMutationParams) => $astroApiClient.delete_voice_role(params.guild_id, params.channel_id),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
