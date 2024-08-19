<script setup lang="ts">
useHead({
  title: "Voice Role guide - "
})

useSeoMeta({
  title: 'Voice Role guide - Astro - Temporary Voice Channels for your Discord!',
  ogTitle: 'Voice Role guide - Astro - Temporary Voice Channels for your Discord!',
  description: 'Learn how to configure voice role to make your server look extra slick',
  ogDescription: 'Learn how to configure voice role to make your server look extra slick',
  ogUrl: 'https://astro-bot.space/'
})
</script>

<template>
  <main class="mt-20 flex min-h-screen w-full flex-col items-center px-4 md:mt-32">
    <div class="prose prose-invert">
      <ContentDoc path="guide_voice_role" />
    </div>
  </main>
</template>