<script setup>
import { nextTick } from 'vue'
import { redirects } from '../assets/config/redirects'

const config = useRuntimeConfig()
const route = useRoute()
const redirect = redirects.find(
  redirect => redirect.id === route.params.redirect.toLowerCase(),
)
const pageContent = redirect
  ? `Redirecting to ${redirect.name}`
  : '404 - Not found'

useHead({
  title: pageContent,
  meta: [{ name: 'title', content: pageContent }],
})

onMounted(() => {
  // Guarantees the DOM tree to be fully built
  nextTick(() => {
    if (redirect) {
      setTimeout(() => {
        try {
          const redirectUrl = redirect.url.replace('{APPLICATION_ID}', config.public.applicationId)
          location.replace(redirectUrl)
        }
        catch (error) {}
      }, 250)
    }
  })
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <UtilCircularLoading />
  </div>
</template>
