export default function useAuth() {
  const { $astroApiClient } = useNuxtApp()
  const queryClient = useQueryClient()

  return {
    login: (redirect_path: string, invite: boolean=false, invite_guild_id: string | null=null) => {
      return $astroApiClient.loginViaDiscord(redirect_path, invite, invite_guild_id)
    },
    logout: async () => {
      await $astroApiClient.logout()
      await queryClient.cancelQueries()
      queryClient.clear()
      window.location.replace('/')
    }
  }
}
