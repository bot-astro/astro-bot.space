import {RouterQueryKeys} from "assets/config/RouterQueryKeys";
import type {LoginResponse, SessionData} from "~/types/session";

export default eventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { code } = getQuery(event)

  if (!code) {
    return sendRedirect(event, '/')
  }

  let data: LoginResponse | null = null
  try {
    data = await $fetch<LoginResponse>(`${config.public.astro_api_base_url}/dashboard/auth/login/${code}`, {
      credentials: 'include'
    })
  } catch (e) {
    console.error(e)
  }

  if (data === null) {
    throw createError({ status: 500, statusMessage: 'Missing session data!' })
  }

  const token = data.token
  const user = data.user as DiscordUser

  const sessionData: SessionData = {
    token,
    user,
  }

  await setUserSession(event, sessionData)

  const guild_id = data.guild?.id

  const redirectRoute = guild_id ? `/redirect?${RouterQueryKeys.GUILD_ID}=${guild_id}` : '/redirect'
  return sendRedirect(event, redirectRoute)
})
