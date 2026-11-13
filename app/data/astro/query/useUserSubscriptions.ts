export function useUserSubscriptions() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: user_subscriptions_qk,
    // upgrade/downgrade mutations invalidate it, checkout is an external page so the app reloads
    staleTime: 120000,
    queryFn: () => $astroApiClient.get_user_chargebee_subscriptions(),
  })
}
