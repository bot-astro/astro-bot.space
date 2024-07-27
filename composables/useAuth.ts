import { StorageKeys } from "~/assets/config/storage"

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
      await $fetch('/api/auth/logout')
      location.reload()
    }
  }
}
