<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonUltimateProps {
  to?: string
  loading?: boolean
  class?: HTMLAttributes['class']
  target?: HTMLAnchorElement['target']
}

const props = defineProps<ButtonUltimateProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn('button-ultimate', props.class)"
    :to="props.to"
    :target="props.target"
    :external="props.target === '_blank'"
  >
    <IconLoading v-show="loading === true" />
    <slot />
  </NuxtLink>
  <button
    v-else
    :disabled="loading"
    :class="cn('button-ultimate', props.class)"
  >
    <IconLoading v-show="loading === true" />
    <slot />
  </button>
</template>
