<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogCancel, type AlertDialogCancelProps } from 'radix-vue'

const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogCancel v-bind="delegatedProps" :class="cn('button-secondary', props.class)">
    <slot />
  </AlertDialogCancel>
</template>
