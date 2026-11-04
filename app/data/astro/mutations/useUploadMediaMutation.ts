import type { Media, MediaType } from '~/types/media'

interface UploadMediaMutationParams {
  guild_id: string
  type: MediaType
  file: File
}

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UploadMediaMutationParams) =>
      $astroApiClient.upload_media(params.guild_id, params.type, params.file),
    onSuccess(data, variables) {
      queryClient.setQueryData<Media[]>(
        guild_media_qk(variables.guild_id),
        (media) => [data, ...(media ?? [])],
      )
    },
  })
}
