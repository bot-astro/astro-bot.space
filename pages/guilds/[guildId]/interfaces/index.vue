<template>
  <div>
    interfaces
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 4,
    name: 'Interfaces',
    icon: 'i-lucide-mouse-pointer-click',
    description: 'Interfaces Description',
  } as DashboardSection
})
</script>
