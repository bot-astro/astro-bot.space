<template>
  <div>
    templates
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 6,
    name: 'Templates',
    icon: 'i-lucide-layout-template',
    description: 'Templates Description',
  } as DashboardSection
})
</script>
