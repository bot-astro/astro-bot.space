<script setup lang="ts">
import type {LoginResponse, SessionData} from "~/types/session";
import {RouterQueryKeys} from "assets/config/RouterQueryKeys";
import useUserSession from "~/composables/useUserSession";

const { $astroApiClient } = useNuxtApp()

const failed = ref(false)
const code = useRoute().query.code as string | undefined
const userSession = useUserSession()

const fail = () => {
  failed.value = true
  setTimeout(() => navigateTo('/', { replace: true }), 3000)
}

onMounted(async () => {
  if (!code) {
    console.error('Missing Discord OAuth code')
    fail()
    return
  }

  try {
    let data: LoginResponse = await $astroApiClient.login(code)
    const token = data.token
    const user = data.user

    const sessionData: SessionData = {
      token,
      user,
    }

    userSession.set(sessionData)

    const guild_id = data.guild?.id

    const redirectRoute = guild_id ? `/redirect?${RouterQueryKeys.GUILD_ID}=${guild_id}` : '/redirect'
    return navigateTo(redirectRoute, { replace: true })
  } catch (e) {
    console.error(e)
    fail()
  }
})
</script>

<template>
  <div class="flex items-center justify-center gap-2 min-h-screen w-full">
    <IconLoading v-if="!failed" class="size-3" />
    <span v-if="!failed" class="animate-pulse text-foreground-secondary">Logging you in</span>
    <span v-else class="text-destructive animate-pulse">Failed to login, redirecting...</span>
  </div>
</template>