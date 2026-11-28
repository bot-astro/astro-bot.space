<script setup lang="ts">
const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.guides.title') }),
  meta: [
    { name: 'description', content: t('meta.guides.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.guides.title') }),
    },
    { property: 'og:description', content: t('meta.guides.description') },
    { property: 'og:url', content: 'https://astro-bot.space/guides' },
  ],
}))
</script>

<template>
  <div class="mx-12 mt-16 flex w-3/4 flex-col items-center gap-16 md:w-auto">
    <div class="flex flex-col gap-4">
      <h1 class="text-title text-center">{{ $t('guides.title') }}</h1>
      <span class="text-subtitle text-center">{{ $t('guides.subtitle') }}</span>
    </div>

    <div class="flex w-full flex-col gap-2">
      <NuxtLink
        to="/guides/basic"
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:bg-background-container/90"
      >
        <IconQuestion
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span
            class="text-heading group-hover:text-foreground-link-standout"
            >{{ $t('guides.basic.title') }}</span
          >
          <span class="text-description">{{
            $t('meta.guide_basic.description')
          }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </NuxtLink>

      <NuxtLink
        to="/guides/generator"
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:bg-background-container/90"
      >
        <IconGenerator
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span
            class="text-heading group-hover:text-foreground-link-standout"
            >{{ $t('guides.generator.title') }}</span
          >
          <span class="text-description">{{
            $t('meta.guide_generator.description')
          }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </NuxtLink>

      <NuxtLink
        to="/guides/interface"
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:bg-background-container/90"
      >
        <IconInterface
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span
            class="text-heading group-hover:text-foreground-link-standout"
            >{{ $t('guides.interface.title') }}</span
          >
          <span class="text-description">{{
            $t('meta.guide_interface.description')
          }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </NuxtLink>

      <NuxtLink
        to="/guides/template"
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:bg-background-container/90"
      >
        <IconTemplate
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span
            class="text-heading group-hover:text-foreground-link-standout"
            >{{ $t('guides.template.title') }}</span
          >
          <span class="text-description">{{
            $t('meta.guide_template.description')
          }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </NuxtLink>

      <NuxtLink
        to="/guides/voice-role"
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:bg-background-container/90"
      >
        <IconVoiceRole
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span
            class="text-heading group-hover:text-foreground-link-standout"
            >{{ $t('guides.voice_role.title') }}</span
          >
          <span class="text-description">{{
            $t('meta.guide_voice_role.description')
          }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </NuxtLink>
    </div>
  </div>
</template>
