export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const session = useUserSession()

  if (!session.loggedIn.value) {
    return useAuth().login(_to.fullPath)
  }
})
