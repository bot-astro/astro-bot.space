export const useApiFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const options = {
    baseURL: config.public.apiBaseUrl,
    ...opts,
  }

  if (authStore.data?.token !== undefined) {
    options.headers = {
      Authorization: authStore.data.token,
    }
  }

  return useFetch(request, options)
}
