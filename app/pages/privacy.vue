<script setup lang="ts">
const { t } = useI18n()

useHead(() => ({
  title: t('meta.privacy.title'),
}))

const { data: page } = await useAsyncData('privacy-policy', () =>
  queryCollection('content').path('/privacy-policy').first(),
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
