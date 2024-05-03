<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface MenuItemsProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<MenuItemsProps>()
</script>

<template>
  <HMenuItems :class="cn('absolute menu', props.class)">
    <slot />
  </HMenuItems>
</template>
