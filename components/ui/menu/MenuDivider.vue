<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface MenuDividerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<MenuDividerProps>()
</script>

<template>
  <hr :class="cn('border border-border', props.class)" role="none">
</template>
