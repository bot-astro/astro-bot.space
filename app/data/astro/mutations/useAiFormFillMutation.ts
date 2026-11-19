import type { AIFormFillRB } from '~/types/ai'

interface AiFormFillMutationParams {
  guild_id: string
  form_fill_rb: AIFormFillRB
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: AiFormFillMutationParams) =>
      $astroApiClient.ai_form_fill(params.guild_id, params.form_fill_rb),
    onSuccess(_data, variables) {
      queryClient.invalidateQueries({
        queryKey: guild_ai_usage_qk(variables.guild_id),
      })
    },
  })
}
