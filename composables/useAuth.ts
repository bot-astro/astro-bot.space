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
      const app = useNuxtApp()

      const userSession = useUserSession()

      if (userSession.data.value !== undefined) {
        try {
          await app.$astroApiClient.logout()
        } catch (e) {
          console.error(e)
        }
      }

      userSession.clear()

      const scope = effectScope()
      scope.run(async () => {
        await app.runWithContext(async () => await useQueryClient().invalidateQueries())
      })


      location.reload()
    }
  }
}
