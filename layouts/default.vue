<!-- eslint-disable vue/no-multiple-template-root -->
<script setup lang="ts">
</script>

<template>
  <NuxtLoadingIndicator />
  <div class="min-h-screen w-full">
    <CoreNavigation />
    <div class="flex items-center justify-center w-full">
      <slot class="" />
    </div>
  </div>

  <CoreFooter class="mt-32" />
</template>
