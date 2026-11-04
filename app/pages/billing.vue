<template>
  <div />
</template>

<script setup lang="ts">
import { toast } from '~/components/ui/toast'

definePageMeta({
  middleware: 'auth',
})

const { $astroApiClient } = useNuxtApp()
const { t } = useI18n()

onMounted(async () => {
  try {
    const url = await $astroApiClient.get_chargebee_portal_session_url()
    navigateTo(url, { external: true })
  } catch (e) {
    console.log(e)

    toast({
      description: t('error.billing_portal'),
      variant: 'destructive',
    })
  }
})
</script>
