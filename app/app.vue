<script setup lang="ts">
const { locale, t } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: t('meta.site.title'),
  meta: [
    { name: 'description', content: t('meta.site.description') },
    { name: 'og:title', content: t('meta.site.title') },
    { name: 'og:description', content: t('meta.site.description') },
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
