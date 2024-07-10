<template>
  <div class="flex flex-col gap-2 p-2">
    <p>
      {{ data.description }}
    </p>
    <p class="text-sm opacity-50">
      {{ data.instant }}
    </p>
    <Button @click="modal.dismiss()">
      Dismiss
    </Button>
  </div>
</template>

<script lang="ts" setup>
import type { components } from '#nuxt-api-party/api'

defineProps<{
  data: components['schemas']['GuildError']
}>()

const modal = useModalStore()
</script>
