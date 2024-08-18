import type {GSTemplate} from "~/types/guild-settings/template";

interface UpdateTemplateMutationParams {
  guild_id: string
  template_id: string
  template_settings: GSTemplate
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateTemplateMutationParams) => $astroApiClient.update_template(params.guild_id, params.template_id, params.template_settings),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
