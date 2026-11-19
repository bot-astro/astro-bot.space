interface ApplyAiProposalMutationParams {
  guild_id: string
  proposal_id: string
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ApplyAiProposalMutationParams) =>
      $astroApiClient.apply_ai_proposal(params.guild_id, params.proposal_id),
    onSuccess(_data, variables) {
      // the proposal can change anything of the guild, refetch settings, channels and roles
      queryClient.invalidateQueries({
        queryKey: guild_settings_qk(variables.guild_id),
      })
    },
  })
}
