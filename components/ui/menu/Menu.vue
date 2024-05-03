<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface MenuProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<MenuProps>()
</script>

<template>
  <HMenu as="div" :class="cn('relative inline-block', props.class)">
    <slot />
  </HMenu>
</template>
