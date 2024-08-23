<template>
  <div />
</template>

<script lang="ts" setup>
onMounted(() => {
  useInvite().invite()
})

useHead({
  title: "Invite Astro - Astro - Temporary Voice Channels for your Discord!",
  meta: [
    { name: 'description', content: 'Invite Astro to your Discord server and start creating temporary voice channels for your community.' },
    { property: 'og:title', content: 'Invite Astro - Astro - Temporary Voice Channels for your Discord!' },
    { property: 'og:description', content: 'Invite Astro to your Discord server and start creating temporary voice channels for your community.' },
    { property: 'og:url', content: 'https://astro-bot.space/invite' }
  ]
})
</script>