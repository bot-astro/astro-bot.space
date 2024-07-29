export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // local / session storage is only available client side
  if (import.meta.client) {
    const session = useUserSession()

    if (!session.loggedIn.value) {
      return useAuth().login(_to.fullPath)
    }
  }
})
