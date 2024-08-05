<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface GroupSettingProps {
  heading: string
  description?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<GroupSettingProps>()
</script>

<template>
  <div class="group flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
    <div class="flex flex-col gap-1 md:gap-0">
      <span class="text-heading">{{ props.heading }}</span>
      <span v-if="props.description" class="text-description">{{ props.description }}</span>
      <slot name="description" class="text-description"/>
    </div>
    <div class="grow" />
    <slot />
  </div>
</template>
