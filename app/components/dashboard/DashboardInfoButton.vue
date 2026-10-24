<template>
  <Popover>
    <PopoverTrigger>
      <ButtonText>
        <IconQuestion class="size-6" />
      </ButtonText>
    </PopoverTrigger>
    <DashboardInfoPopoverContent
      :title="props.title"
      :guide-button-uri="props.guideButtonUri"
    >
      <slot />
    </DashboardInfoPopoverContent>
  </Popover>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string; guideButtonUri?: string }>()
</script>
