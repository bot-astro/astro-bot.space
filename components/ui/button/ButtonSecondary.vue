<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonSecondaryProps {
  to?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<ButtonSecondaryProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn('button-secondary', props.class)"
    :to="props.to"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn('button-secondary', props.class)"
  >
    <slot />
  </button>
</template>
