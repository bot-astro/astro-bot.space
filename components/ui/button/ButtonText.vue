<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonTextProps {
  to?: string
  destructive?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<ButtonTextProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn(destructive ? 'button-text-destructive' : 'button-text', props.class)"
    :to="props.to"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn(destructive ? 'button-text-destructive' : 'button-text', props.class)"
  >
    <slot />
  </button>
</template>
