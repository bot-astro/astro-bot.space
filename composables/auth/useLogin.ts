export const useLogin = () => {
    const config = useRuntimeConfig()
    const router = useRouter()

    const previousRoute = router.options.history.state.back?.toString() ?? '/'

    onMounted(() => {
        if (process.client) {
            sessionStorage.setItem(
                StorageKeys.AUTH_PREVIOUS_ROUTE,
                previousRoute,
            )

            navigateTo(config.public.oauthUrl, { replace: true, external: true })
        }
    })
}