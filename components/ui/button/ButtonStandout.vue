<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonStandoutProps {
  to?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<ButtonStandoutProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn('button-standout', props.class)"
    :to="props.to"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn('button-standout', props.class)"
  >
    <slot />
  </button>
</template>
