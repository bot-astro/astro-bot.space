<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface GroupSettingProps {
  heading: string
  description?: string
  class?: HTMLAttributes['class']
  compact?: boolean
}

const props = defineProps<GroupSettingProps>()
</script>

<template>
  <div :class="cn(props.class, props.compact && 'max-w-64', 'group flex flex-col gap-2')">
    <div class="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
      <div class="flex flex-col gap-1 md:gap-0">
        <span class="text-heading">{{ props.heading }}</span>
        <span v-if="props.description" class="text-description">{{ props.description }}</span>
        <slot name="description" class="text-description"/>
      </div>
      <div class="grow" />
      <slot />
    </div>
    <div v-if="props.compact" class="grow" />
    <slot name="bottom-action" />
  </div>
</template>
