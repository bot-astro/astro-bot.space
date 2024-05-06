<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonDestructiveProps {
  to?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<ButtonDestructiveProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn('button-destructive', props.class)"
    :to="props.to"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn('button-destructive', props.class)"
  >
    <slot />
  </button>
</template>
