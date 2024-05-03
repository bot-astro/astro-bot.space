<script setup>
provideHeadlessUseId(() => useId())
</script>

<template>
  <div class="dark">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
