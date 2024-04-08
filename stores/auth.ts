import { defineStore } from 'pinia'

interface AuthState {
  data: AuthData | undefined
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): AuthState => ({
    data: undefined,
  }),
  persist: true,
  actions: {
    set(data: AuthData) {
      this.data = data
    },
    logout() {
      if (this.data?.user?.id && this.data?.token) {
        const config = useRuntimeConfig()
        $fetch(`${config.public.apiBaseUrl}/auth/user/delete/${this.data?.user.id}`, {
          headers: {
            Authorization: this.data.token,
          },
        })
      }

      this.data = undefined
    },
  },
})
