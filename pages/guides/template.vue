<script setup lang="ts">
useHead({
  title: "Template guide - "
})

useSeoMeta({
  title: 'Template guide - Astro - Temporary Voice Channels for your Discord!',
  ogTitle: 'Template guide - Astro - Temporary Voice Channels for your Discord!',
  description: 'Discover templates and learn how to configure them, your users will love them',
  ogDescription: 'Discover templates and learn how to configure them, your users will love them',
  ogUrl: 'https://astro-bot.space/'
})
</script>

<template>
  <main class="mt-20 flex min-h-screen w-full flex-col items-center px-4 md:mt-32">
    <div class="prose prose-invert">
      <ContentDoc path="guide_template" />
    </div>
  </main>
</template>