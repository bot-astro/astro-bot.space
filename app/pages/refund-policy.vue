<script setup lang="ts">
useHead({
  title: 'Refund Policy - Astro - Temporary Voice Channels for your Discord!',
})

const { data: page } = await useAsyncData('refund-policy', () =>
  queryCollection('content').path('/refund-policy').first(),
)
</script>

<template>
  <main
    class="mt-20 flex min-h-screen w-full flex-col items-center px-4 md:mt-32"
  >
    <div class="prose prose-invert">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </main>
</template>
