<script setup lang="ts">
const { locale, t } = useI18n()
const route = useRoute()
const { url: siteUrl } = useSiteConfig()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: t('meta.site.title'),
  link: [{ rel: 'canonical', href: `${siteUrl}${route.path}` }],
  meta: [
    { name: 'description', content: t('meta.site.description') },
    { property: 'og:title', content: t('meta.site.title') },
    { property: 'og:description', content: t('meta.site.description') },
    { property: 'og:url', content: `${siteUrl}${route.path}` },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ParticlesBG />
  <Toaster />
</template>
