function isAuthenticated(): boolean {
  const authStore = useAuthStore()
  return authStore.data !== undefined
}

export default defineNuxtRouteMiddleware((to, from) => {
  if (isAuthenticated() === false)
    return navigateTo('/login')
})
