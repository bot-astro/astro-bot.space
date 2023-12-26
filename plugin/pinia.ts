import { useAuthStore } from '~/store'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      authStore: useAuthStore($pinia)
    }
  }
})