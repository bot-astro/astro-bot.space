<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastClose, type ToastCloseProps } from 'radix-vue'
import { X } from 'lucide-vue-next'

const props = defineProps<
  ToastCloseProps & {
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastClose
    v-bind="delegatedProps"
    :class="
      cn(
        'absolute top-2 right-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:ring-2 focus:outline-none group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
        props.class,
      )
    "
  >
    <X class="size-4" />
  </ToastClose>
</template>
