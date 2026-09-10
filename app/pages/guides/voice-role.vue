<script setup lang="ts">
definePageMeta({
  layout: 'guide',
})


useHead({
  title: "Voice Role guide - Astro - Temporary Voice Channels for your Discord!",
  meta: [
    { name: 'description', content: 'Learn how to configure voice role to make your server look extra slick' },
    { property: 'og:title', content: 'Voice Role guide - Astro - Temporary Voice Channels for your Discord!' },
    { property: 'og:description', content: 'Learn how to configure voice role to make your server look extra slick' },
    { property: 'og:url', content: 'https://astro-bot.space/guides/voice-role' }
  ]
})
</script>

<template>
  <ContentDoc path="guide_voice_role" v-slot="{ doc }">
    <!-- Post title -->
    <div class="flex gap-4 items-center mb-4">
      <IconBack class="size-8 shrink-0 hover:text-foreground-link-standout hover:cursor-pointer" @click="useRouter().back()"/>
      <h1 class="mb-0">{{ doc.title }}</h1>
    </div>

    <!-- Table of contents -->
    <ul>
      <li v-for="link of doc.body?.toc?.links ?? []" :key="link.id">
        <a :href="`#${link.id}`">{{ link.text }}</a>
      </li>
    </ul>

    <!-- Main post content -->
    <ContentRenderer :value="doc" />
  </ContentDoc>
</template>