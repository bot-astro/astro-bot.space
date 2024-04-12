import {useLogin} from "~/composables/auth/useLogin";

function isAuthenticated(): boolean {
  const authStore = useAuthStore()
  return authStore.data !== undefined
}

export default defineNuxtRouteMiddleware((_to, from) => {
  if (!isAuthenticated())
    return useLogin()
})
