<template>
  <main class="mt-20 flex min-h-screen w-full flex-col items-center px-4 md:mt-32">
    <div class="prose prose-invert">
      <ContentDoc path="terms-of-service" />
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: "Terms of Service - "
})
</script>