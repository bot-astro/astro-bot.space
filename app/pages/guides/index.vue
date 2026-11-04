<script setup lang="ts">
import { navigateTo } from '#imports'
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
      <span class="text-title text-center">{{ $t('guides.title') }}</span>
      <span class="text-subtitle text-center">{{ $t('guides.subtitle') }}</span>
    </div>

    <div class="flex w-full flex-col gap-2">
      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/basic')"
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
      </div>

      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/generator')"
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
      </div>

      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/interface')"
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
      </div>

      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/template')"
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
      </div>

      <div
        class="group flex w-full items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo('/guides/voice-role')"
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
      </div>
    </div>
  </div>
</template>
