export function useUserSubscriptions() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: user_subscriptions_qk,
    queryFn: () => $astroApiClient.get_user_chargebee_subscriptions()
  })
}