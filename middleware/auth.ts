import type {UserSession} from "~/types/auth";
import {CookieKeys} from "assets/config/CookieKeys";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const cookie = useCookie<UserSession | undefined>(CookieKeys.USER_SESSION)

  if (!cookie.value?.user) {
    return useAuth().login(_to.fullPath)
  }
})
