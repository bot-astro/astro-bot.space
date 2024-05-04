<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonProps {
  to?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn('button', props.class)"
    :to="props.to"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn('button', props.class)"
  >
    <slot />
  </button>
</template>
