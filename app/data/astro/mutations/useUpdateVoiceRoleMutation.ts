import type {GSVoiceRole} from "~/types/guild-settings/voice_role";

interface UpdateVoiceRoleMutationParams {
  guild_id: string
  channel_id: string
  voice_role_settings: GSVoiceRole
}

export default function() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateVoiceRoleMutationParams) => $astroApiClient.update_voice_role(params.guild_id, params.channel_id, params.voice_role_settings),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}
