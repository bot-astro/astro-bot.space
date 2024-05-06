<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface SkeletonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-gray-500 opacity-30', props.class)" />
</template>
