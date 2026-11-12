<script lang="ts" setup>
onMounted(() => {
  useInvite().invite()
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.invite.title'),
  meta: [
    {
      name: 'description',
      content: t('meta.invite.description'),
    },
    {
      property: 'og:title',
      content: t('meta.invite.title'),
    },
    {
      property: 'og:description',
      content: t('meta.invite.description'),
    },
    { property: 'og:url', content: 'https://astro-bot.space/invite' },
  ],
}))
</script>

<template>
  <div />
</template>
