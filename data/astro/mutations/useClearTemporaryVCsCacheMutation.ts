interface ClearCacheMutationParams {
  guild_id: string
}

export function useClearTemporaryVCsCacheMutation() {
  const { $astroApiClient } = useNuxtApp()

  return useMutation({
    mutationFn: (params: ClearCacheMutationParams) => $astroApiClient.clear_temporary_vcs_cache(params.guild_id),
  })
}