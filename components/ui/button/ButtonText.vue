<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import Button from "~/components/ui/button/Button.vue";

interface ButtonTextProps {
  to?: string
  loading?: boolean
  destructive?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<ButtonTextProps>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="cn(destructive ? 'button-text-destructive' : 'button-text', props.class)"
    :to="props.to"
  >
    <IconLoading v-show="loading === true" />
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="cn(destructive ? 'button-text-destructive' : 'button-text', props.class)"
    :disabled="loading"
  >
    <IconLoading v-show="loading === true" />
    <slot />
  </button>
</template>
