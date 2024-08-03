<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonUltimateProps {
  to?: string
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
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn('button-ultimate', props.class)"
  >
    <slot />
  </button>
</template>
