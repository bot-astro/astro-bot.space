<template>
  <div />
</template>

<script setup lang="ts">
import {toast} from "~/components/ui/toast";

definePageMeta({
  middleware: 'auth'
})

const { $astroApiClient } = useNuxtApp()

onMounted(async () => {
  try {
    const url = await $astroApiClient.get_chargebee_portal_session_url()
    navigateTo(url, { external: true })
  } catch (e) {
    console.log(e)

    toast({
      description: 'Something went wrong when opening the billing portal, try again later',
      variant: 'destructive'
    })
  }
})
</script>