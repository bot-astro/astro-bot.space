import { ofetch } from 'ofetch'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  const instance = ofetch.create({
    baseURL: config.public.apiBaseUrl,
    // eslint-disable-next-line unused-imports/no-unused-vars
    onRequest({ request, options }) {
      const authStore = useAuthStore()

      if (authStore.data?.token !== undefined)
        options.headers = { Authorization: authStore.data.token }
    },
  })

  return {
    provide: {
      apiFetch: instance
    }
  }
})
