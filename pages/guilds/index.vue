<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <span class="text-xl font-semibold">Servers</span>
    <span class="text-sm text-secondary">Select a server to manage</span>
  </div>
</template>
