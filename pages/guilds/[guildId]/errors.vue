<template>
  <div>
    Errors Page
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 2,
    name: 'Errors',
    icon: 'i-lucide-message-square-warning',
    description: 'Errors Description',
  } as DashboardSection
})
</script>
