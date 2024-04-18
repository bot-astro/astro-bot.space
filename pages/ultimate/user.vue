<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="w-3/4 md:w-auto flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-col gap-4 justify-center items-center h-full">
      <span class="text-title">Ultimate user</span>
      <span class="text-subtitle">This plan is coming soon!</span>
    </div>
  </div>
</template>
