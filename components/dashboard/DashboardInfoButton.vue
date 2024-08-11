<template>
  <Popover>
    <PopoverTrigger>
      <ButtonText>
        <IconQuestion class="size-6" />
      </ButtonText>
    </PopoverTrigger>
    <DashboardInfoPopoverContent :title="props.title" :guide_button_uri="props.guide_button_uri">
      <slot />
    </DashboardInfoPopoverContent>
  </Popover>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string, guide_button_uri?: string }>()
</script>