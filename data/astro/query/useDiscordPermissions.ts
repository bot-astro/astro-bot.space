import {discord_permissions_qk} from "~/data/astro/config/query-keys";

export function useDiscordPermissions() {
    const { $astroApiClient } = useNuxtApp()

    return useQuery({
        queryKey: discord_permissions_qk,
        queryFn: () => $astroApiClient.get_discord_permissions()
    })
}