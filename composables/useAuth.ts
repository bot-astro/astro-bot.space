import { StorageKeys } from "~/assets/config/storage"

export default function () {
  return {
    login: (path?: string) => {
      const config = useRuntimeConfig()

      const previousRoute = path ?? '/'
      sessionStorage.setItem(
        StorageKeys.AUTH_REDIRECT,
        previousRoute,
      )

      navigateTo(config.public.oauthUrl, { replace: true, external: true })
    },
    logout: async () => {
      await $fetch('/api/auth/logout')
      location.reload()
    }
  }
}
