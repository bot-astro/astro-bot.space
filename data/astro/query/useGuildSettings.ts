import {guilds_qk} from "~/data/astro/config/query-keys";

export function useGuildSettings() {
  const { $astroApiClient } = useNuxtApp()

  return useQuery({
    queryKey: guilds_qk,
    queryFn: () => $astroApiClient.get_guilds()
  })
}