<!-- eslint-disable vue/no-multiple-template-root -->
<script setup lang="ts">
</script>

<template>
  <NuxtLoadingIndicator />
  <div class="flex text-sm w-full h-full">
    <DashboardSidebar />
    <div class="flex flex-col w-full h-full">
      <DashboardNavbar />
      <div class="flex flex-col grow">
        <slot />
        <CoreFooter class="mt-auto" />
      </div>
    </div>
  </div>
</template>
