<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <NuxtLoadingIndicator />
  <div class="min-h-screen">
    <CoreNavigation />
    <div class="flex items-center justify-center">
      <slot class="" />
    </div>
  </div>

  <CoreFooter class="mt-32" />
</template>
<script setup lang="ts">
</script>