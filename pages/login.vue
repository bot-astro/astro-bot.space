<!-- eslint-disable no-console -->
<script lang="ts" setup>
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const previousRoute = route.query.from?.toString() ?? router.options.history.state.back?.toString() ?? '/'

onMounted(() => {
  sessionStorage.setItem(
    'auth-previous-route',
    previousRoute,
  )

  navigateTo(config.public.oauthUrl, { replace: true, external: true })
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <UtilCircularLoading />
  </div>
</template>

<style></style>
