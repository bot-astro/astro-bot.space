import type { GeneratorCreateRB } from '~/types/guild-settings/request-bodies/generator_create_rb'

interface CreateGeneratorMutationParams {
  guild_id: string
  generator_rb: GeneratorCreateRB
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateGeneratorMutationParams) =>
      $astroApiClient.create_generator(params.guild_id, params.generator_rb),
    async onSuccess(data, variables) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
      await queryClient.invalidateQueries({
        queryKey: guild_channels_qk(variables.guild_id),
      })
    },
  })
}
