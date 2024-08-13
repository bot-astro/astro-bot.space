import type {GSGenerator} from "~/types/guild-settings/generator";

interface UpdateGeneratorMutationParams {
  guild_id: string
  generator_id: string
  generator_settings: GSGenerator
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateGeneratorMutationParams) => $astroApiClient.update_generator(params.guild_id, params.generator_id, params.generator_settings),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
