import type {GSVoiceRole} from "~/types/guild-settings/voice_role";

interface CreateVoiceRoleMutationParams {
  guild_id: string
  voice_role_settings: GSVoiceRole
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateVoiceRoleMutationParams) => $astroApiClient.create_voice_role(params.guild_id, params.voice_role_settings),
    async onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
