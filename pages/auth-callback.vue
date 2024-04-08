<script lang="ts" setup>
const route = useRoute()
const config = useRuntimeConfig()
const authStore = useAuthStore()
const isError = ref(false)

onMounted(async () => {
  await nextTick()

  const previousRoute = sessionStorage.getItem('auth-previous-route') ?? '/'
  const oauthCode = route.query.code?.toString()

  if (oauthCode == null) {
    isError.value = true
  }
  else {
    const { data, error } = await useFetch<AuthData>(`${config.public.apiBaseUrl}/auth/id/${oauthCode}`)

    if (data.value != null) {
      authStore.set(data.value)
      navigateTo(previousRoute, { replace: true })
    }
    else if (error.value != null) {
      isError.value = true
      console.error(error.value)
    }
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center text-center">
    <UtilCircularLoading v-if="!isError" />
    <div v-else>
      <span>Something went wrong, please try again</span>
    </div>
  </div>
</template>

<style></style>
