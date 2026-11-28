import type { Grant } from '~/types/grant'

export default function () {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (grant_id: string) => $astroApiClient.revoke_grant(grant_id),
    onSuccess(_, grant_id) {
      queryClient.setQueryData<Grant[]>(user_grants_qk, (grants) =>
        (grants ?? []).filter((g) => g.id !== grant_id),
      )
    },
  })
}
