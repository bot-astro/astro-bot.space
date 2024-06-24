export default eventHandler(async (event) => {
  const session = await getUserSession(event)

  if (session.user) {
    $api('/dashboard/auth/logout').catch((e) => {
      console.error('Failed logging out', e)
    })
  }

  await clearUserSession(event)
})
