<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-4">
      <Icon name="lucide:server" class="size-10" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">Generators</span>
        <span class="dashboard-section-description">Manage temporary voice channels generators here!</span>
      </div>
      <div class="flex-grow" />
      <Button @click="">
        <Icon name="fluent:add-12-regular" />
        Create
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 3,
    name: 'Generators',
    icon: 'i-lucide-copy-plus',
    description: 'Generators Description',
  } as DashboardSection
})
</script>
