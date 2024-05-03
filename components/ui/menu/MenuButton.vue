<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface MenuButtonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<MenuButtonProps>()
</script>

<template>
  <HMenuButton :class="props.class">
    <slot />
  </HMenuButton>
</template>