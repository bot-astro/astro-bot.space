import { StorageKeys } from "assets/config/StorageKeys"
import useUserSession from "~/composables/useUserSession";
import type {DiscordUser} from "~/types/discord";

export default function () {
  return {
    login: (path?: string) => {
      const config = useRuntimeConfig()

      const previous_route = path ?? '/'

      sessionStorage.setItem(
        StorageKeys.AUTH_REDIRECT,
        previous_route,
      )

      navigateTo(config.public.login_oauth_url, { replace: true, external: true })
    },
    logout: async () => {
      const { $astroApiClient } = useNuxtApp()
      const queryClient = useQueryClient()


      const userSession = useUserSession()

      if (userSession.data.value !== undefined) {
        try {
          await $astroApiClient.logout()
        } catch (e) {
          console.error(e)
        }
      }

      userSession.clear()

      await queryClient.invalidateQueries()

      location.reload()
    }
  }
}
