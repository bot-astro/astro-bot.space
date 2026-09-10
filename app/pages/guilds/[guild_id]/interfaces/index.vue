<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconInterface class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">Interfaces</span>
        <span class="dashboard-section-description">Manage the interfaces of your server here!</span>
      </div>
    </div>

    <div class="flex flex-col items-center gap-2 mt-16">
      <span>The Interface editor is still under development, please use slash commands to create and manage interfaces</span>
      <Button @click="navigateTo('/guides/interface')">See guide</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IconNames} from "assets/config/IconNames";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 4,
    name: 'Interfaces',
    icon: 'astro:interface',
    description: 'Interfaces Description',
  } as DashboardSection
})

useHead({
  title: "Interfaces - Astro - Temporary Voice Channels for your Discord!",
  meta: [
    { name: 'description', content: 'Manage the interfaces of your server' },
    { property: 'og:title', content: 'Interfaces - Astro - Temporary Voice Channels for your Discord!' },
    { property: 'og:description', content: 'Manage the interfaces of your server' },
    { property: 'og:url', content: 'https://astro-bot.space/guilds/interfaces' }
  ]
})
</script>
