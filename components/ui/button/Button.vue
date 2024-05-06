<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonProps {
  to?: string
  external?: boolean
  loading?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <!-- TODO: Fix external property -->
  <NuxtLink
    v-if="to"
    :class="cn('button', props.class)"
    :to="props.to"
    :external
  >
    <IconLoading v-show="loading" />
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn('button', props.class, props.loading ? 'cursor-not-allowed' : '')"
    :disabled="loading"
  >
    <IconLoading v-show="loading" />
    <slot />
  </button>
</template>
