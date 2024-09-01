interface RefreshGuildEntitlementsParams {
  guild_id: string
}

export function useRefreshGuildEntitlementsMutation() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RefreshGuildEntitlementsParams) => $astroApiClient.refresh_entitlements(params.guild_id),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(guild_settings_qk(variables.guild_id), data)
    },
  })
}