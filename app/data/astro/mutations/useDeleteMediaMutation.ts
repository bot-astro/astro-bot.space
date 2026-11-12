import type { Media } from '~/types/media'

interface DeleteMediaMutationParams {
  guild_id: string
  media_id: string
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteMediaMutationParams) =>
      $astroApiClient.delete_media(params.guild_id, params.media_id),
    onSuccess(_, variables) {
      queryClient.setQueryData<Media[]>(
        guild_media_qk(variables.guild_id),
        (media) => (media ?? []).filter((m) => m.id !== variables.media_id),
      )
    },
  })
}
