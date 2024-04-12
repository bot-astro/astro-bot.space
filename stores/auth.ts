import { defineStore } from 'pinia'

interface AuthState {
  data: AuthData | undefined
}

export const useAuthStore = defineStore({
  id: 'authStore',
  persist: true,
  state: (): AuthState => ({
    data: undefined,
  }),
  getters: {
    isAuthenticated: state => state.data !== undefined,
  },
  actions: {
    set(data: AuthData | undefined) {
      this.data = data
    },
  },
})
