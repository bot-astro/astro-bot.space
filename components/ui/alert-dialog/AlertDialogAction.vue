<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue'

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'], loading?: boolean, destructive?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps" :class="cn(destructive === true ? 'button-destructive' : 'button', props.class)">
    <IconLoading v-show="props.loading" />
    <slot />
  </AlertDialogAction>
</template>
