import { defineStore } from "pinia";

interface AuthState {
  data: AuthData | undefined;
}

export const useAuthStore = defineStore({
  id: "authStore",
  state: (): AuthState => ({
    data: undefined
  }),
  actions: {
    set(data: AuthData) {
      this.data = data
    }
  },
});
