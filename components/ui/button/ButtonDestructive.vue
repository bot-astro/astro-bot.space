<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonDestructiveProps {
  to?: string
  loading?: boolean
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
    <IconLoading v-show="loading === true" />
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn('button-destructive', props.class)"
    :disabled="loading"
  >
    <IconLoading v-show="loading === true" />
    <slot />
  </button>
</template>
