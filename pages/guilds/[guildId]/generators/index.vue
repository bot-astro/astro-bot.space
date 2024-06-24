<template>
  <div>
    generators
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
