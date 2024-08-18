<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonProps {
  to?: string
  loading?: boolean
  class?: HTMLAttributes['class'],
  target?: HTMLAnchorElement['target']
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn('button', props.class)"
    :to="props.to"
    :external="props.target === '_blank'"
    :target="target"
  >
    <IconLoading v-show="loading === true" />
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
