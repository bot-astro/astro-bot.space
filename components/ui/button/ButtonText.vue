<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface ButtonTextProps {
  text: string
  to?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<ButtonTextProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn('button-text', props.class)"
    :to="props.to"
  >
    {{ text }}
  </NuxtLink>
  <div
    v-else
    :class="cn('button-text', props.class)"
  >
    {{ text }}
  </div>
</template>
