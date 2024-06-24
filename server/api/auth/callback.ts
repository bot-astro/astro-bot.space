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

  const guildId = data.guild?.id

  const redirectRoute = guildId ? `/redirect?guildId=${guildId}` : '/redirect'
  return sendRedirect(event, redirectRoute)
})
