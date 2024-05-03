<script setup>
provideHeadlessUseId(() => useId())
</script>

<template>
  <div class="h-full w-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
