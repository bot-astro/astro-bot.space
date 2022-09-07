import { useAuthStore } from "~~/store/auth"

export default function () {
  return {
    getAuthToken: () => {
      const authStore = useAuthStore()
      if (authStore.sessionToken) {
        return authStore.sessionToken
      }
      return localStorage.getItem('sessionToken')
    },
    persistAuthToken: (token: string) => {
      const authStore = useAuthStore()
      authStore.$patch({
        sessionToken: token
      })
      localStorage.setItem('sessionToken', token)
    },
    clearAuthToken: () => {
      const authStore = useAuthStore()
      authStore.$patch({
        sessionToken: null
      })
      localStorage.removeItem('sessionToken')
    }
  }
}
