<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales, setLocale } = useI18n()
const available_locales = computed(() => locales.value as LocaleObject[])
const flags: Record<string, string> = { 'en-US': '🇺🇸', it: '🇮🇹' }
</script>

<template>
  <div
    class="w-full border-t border-neutral-800 bg-neutral-950 px-4 pt-12 pb-4"
  >
    <!-- footer links section -->
    <div class="my-6 flex flex-wrap justify-between gap-12 sm:justify-around">
      <div class="flex flex-col gap-y-4">
        <p>{{ $t('footer.resources') }}</p>
        <div class="flex flex-col gap-y-3 text-sm">
          <ButtonText to="/guides"> {{ $t('nav.guides') }} </ButtonText>
          <ButtonText to="/ultimate"> {{ $t('nav.ultimate') }} </ButtonText>
          <ButtonText to="/support"> {{ $t('footer.support') }} </ButtonText>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <p>{{ $t('footer.company') }}</p>
        <div class="flex flex-col gap-y-3 text-sm">
          <ButtonText to="/"> {{ $t('footer.home') }} </ButtonText>
          <a href="mailto:hi@astro-bot.space" class="button-text">
            {{ $t('footer.contact_us') }}
          </a>
          <a
            href="https://github.com/bot-astro/astro"
            target="_blank"
            class="button-text"
          >
            {{ $t('nav.github') }}
          </a>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <p>{{ $t('footer.legal') }}</p>
        <div class="flex flex-col gap-y-3 text-sm">
          <ButtonText to="/privacy">
            {{ $t('footer.privacy_policy') }}
          </ButtonText>
          <ButtonText to="/terms">
            {{ $t('footer.terms_of_service') }}
          </ButtonText>
          <ButtonText to="/refund-policy">
            {{ $t('footer.refund_policy') }}
          </ButtonText>
        </div>
      </div>
    </div>

    <!-- copyright, developed by text and language selector -->
    <div
      class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div
        class="flex flex-col items-center gap-2 text-sm text-dimmed sm:items-start"
      >
        <span class="flex items-center">
          <Icon name="fluent:code-16-filled" class="size-5" />
          &nbsp;{{ $t('footer.by') }}&nbsp;<a
            href="https://giuliopime.dev"
            target="_blank"
            class="text-foreground-link-standout hover:opacity-80"
            >Giuliopime</a
          >
        </span>
        <span class="text-center">
          {{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger class="flex items-center gap-2 text-sm">
          <span class="text-lg leading-none">{{ flags[locale] }}</span>
          {{ available_locales.find((l) => l.code === locale)?.name }}
          <IconDropdown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            v-for="l in available_locales"
            :key="l.code"
            class="gap-2"
            @click="setLocale(l.code)"
          >
            <span class="text-base leading-none">{{ flags[l.code] }}</span>
            {{ l.name }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
