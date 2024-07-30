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
    id: 5,
    name: 'Voice Roles',
    icon: 'i-lucide-file-volume',
    description: 'Voice Roles Description',
  } as DashboardSection
})
</script>
