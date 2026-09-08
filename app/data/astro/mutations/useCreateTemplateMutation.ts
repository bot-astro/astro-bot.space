import type {GSTemplate} from "~/types/guild-settings/template";

interface CreateTemplateMutationParams {
  guild_id: string
  template_settings: GSTemplate
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateTemplateMutationParams) => $astroApiClient.create_template(params.guild_id, params.template_settings),
    async onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
