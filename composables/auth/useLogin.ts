export function useLogin() {
  const config = useRuntimeConfig()
  const router = useRouter()

  const previousRoute = router.options.history.state.back?.toString() ?? '/'
  sessionStorage.setItem(
    StorageKeys.AUTH_PREVIOUS_ROUTE,
    previousRoute,
  )

  navigateTo(config.public.oauthUrl, { replace: true, external: true })
}
