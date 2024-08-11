<template>
  <PopoverContent class="flex flex-col gap-4 max-w-xs sm:max-w-sm md:max-w-lg border-border">
    <div class="vertical-center gap-2">
      <IconQuestion class="size-6"/>
      <span>
        {{ props.title }}
      </span>
    </div>

    <slot/>

    <div v-if="props.guide_button_uri" class="flex w-full items-center justify-end">
      <ButtonSecondary @click="navigateTo(props.guide_button_uri, { open: { target: '_blank' } })">
        See guide
      </ButtonSecondary>
    </div>
  </PopoverContent>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string, guide_button_uri?: string }>()
</script>