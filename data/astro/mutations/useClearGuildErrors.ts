import {guild_errors_qk} from "~/data/astro/config/query-keys";

interface ClearGuildErrorsMutationParams {
  guild_id: string;
}

export function useClearGuildErrorsMutation() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ClearGuildErrorsMutationParams) => $astroApiClient.clear_guild_errors(params.guild_id),
    async onSuccess(data, variables, context) {
       await queryClient.invalidateQueries({ queryKey: guild_errors_qk(variables.guild_id) })
    },
  })
}