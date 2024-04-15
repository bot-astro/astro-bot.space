<!-- eslint-disable vue/no-multiple-template-root -->
<script setup lang="ts">
</script>

<template>
  <NuxtLoadingIndicator />
  <div class="flex text-sm">
    <DashboardSidebar />
    <div class="flex flex-col w-full">
      <DashboardNavbar />
      <div class="flex flex-col">
        <slot />
        <CoreFooter class="mt-32" />
      </div>
    </div>
  </div>
</template>
