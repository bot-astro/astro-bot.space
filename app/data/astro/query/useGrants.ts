export function useGrants() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: user_grants_qk,
    queryFn: () => $astroApiClient.get_grants(),
  })
}
