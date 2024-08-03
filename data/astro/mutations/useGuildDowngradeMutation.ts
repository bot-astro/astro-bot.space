export interface UseGuildDowngradeMutationParams {
  guild_id: string
}

export function useGuildDowngradeMutation() {
  const {$astroApiClient} = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UseGuildDowngradeMutationParams) => $astroApiClient.downgrade_guild(params.guild_id),
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({queryKey: guild_settings_qk(variables.guild_id)})
    }
  })
}