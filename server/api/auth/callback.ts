import {RouterQueryKeys} from "assets/config/RouterQueryKeys";

export default eventHandler(async (event) => {
  const { code } = getQuery(event)

  if (!code) {
    throw createError({ status: 401, statusMessage: 'Missing the OAuth2 authorization code!' })
  }

  const data = await $api('/dashboard/auth/login/{code}', {
    path: {
      code: code?.toString(),
    },
  })

  if (!data.token || !data.user) {
    throw createError({ status: 500, statusMessage: 'Missing session data!' })
  }

  const token = data.token!
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
