interface CancelAiProposalMutationParams {
  guild_id: string
  proposal_id: string
}

export default function () {
  const { $astroApiClient } = useNuxtApp()

  return useMutation({
    mutationFn: (params: CancelAiProposalMutationParams) =>
      $astroApiClient.cancel_ai_proposal(params.guild_id, params.proposal_id),
  })
}
