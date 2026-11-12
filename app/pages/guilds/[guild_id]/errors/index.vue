<template>
  <div class="flex flex-col gap-8">
    <!--     intro-->
    <div class="flex items-center gap-4">
      <Icon
        :name="IconNames.ERROR"
        class="size-10 text-foreground-link-standout"
      />
      <div class="flex flex-col">
        <span class="dashboard-section-title">{{ $t('errors.title') }}</span>
        <span class="dashboard-section-description">{{
          $t('errors.description')
        }}</span>
      </div>
      <div class="grow" />
      <ButtonDestructive @click="clear_errors({ guild_id: guild_id! })">
        {{ $t('errors.clear') }}
      </ButtonDestructive>
    </div>

    <div v-if="errors">
      <div v-if="errors.length > 0" class="group-setting flex flex-col p-0">
        <!-- errors -->
        <div v-for="(error, i) in errors" :key="i" class="flex flex-col">
          <div class="flex items-center gap-4 px-4 py-6">
            <Icon
              name="i-fluent-error-circle-20-regular"
              size="1.5rem"
              class="shrink-0"
            />
            <div class="flex flex-col">
              <span class="overflow-hidden text-ellipsis">
                {{ error.description }}
              </span>
              <p v-if="error.timestamp" class="text-sm opacity-50">
                {{
                  $d(new Date(error.timestamp), {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                }}
              </p>
            </div>
            <div class="grow" />
            <Dialog>
              <DialogTrigger class="shrink-0">
                <Button> {{ $t('errors.view') }} </Button>
              </DialogTrigger>

              <DialogContent>
                <div class="flex flex-col text-sm">
                  <p class="text-lg font-bold">{{ $t('errors.details') }}</p>
                  <p class="mt-2">
                    {{ error.description }}
                  </p>
                  <p class="mt-1 text-sm opacity-50">
                    {{
                      $d(new Date(error.timestamp), {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    }}
                  </p>
                  <div class="mt-2 flex w-full items-center justify-end gap-2">
                    <ButtonSecondary
                      @click="
                        navigateToGuide(error.guide ?? GSErrorGuide.BASIC)
                      "
                    >
                      {{ $t('common.see_guide') }}
                    </ButtonSecondary>

                    <ButtonUltimate @click="navigateTo(`/guilds/${guild_id}/`)">
                      {{ $t('dashboard.upgrade.title') }}
                    </ButtonUltimate>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <hr v-if="i !== errors.length - 1" class="w-full bordered" />
        </div>
      </div>
      <div v-else class="flex flex-col items-center gap-2 p-8 text-center">
        <p class="text-2xl font-bold">{{ $t('errors.none_title') }}</p>
        <p class="text-lg opacity-75">
          {{ $t('errors.none_description') }}
        </p>
      </div>
    </div>
    <div v-else-if="errors_error" class="center text-foreground-destructive">
      {{ $t('common.error_generic') }}
    </div>
    <div v-else class="center">
      <IconLoading />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navigateTo } from '#imports'
import { useGuildErrors } from '~/data/astro/query/useGuildErrors'
import { useClearGuildErrorsMutation } from '~/data/astro/mutations/useClearGuildErrors'
import type { DashboardSection } from '~/types/dashboard'
import { GSErrorGuide } from '~/types/guild-settings/error'
import { IconNames } from '~/constants/IconNames'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 2,
    name: 'dashboard.sections.errors',
    icon: 'i-lucide-message-square-warning',
    description: 'Errors Description',
  } as DashboardSection,
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.errors.title') }),
  meta: [
    { name: 'description', content: t('meta.errors.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.errors.title') }),
    },
    { property: 'og:description', content: t('meta.errors.description') },
    { property: 'og:url', content: 'https://astro-bot.space/guilds/errors' },
  ],
}))

const guild_id = useGuildId()
const { data: errors, isError: errors_error } = useGuildErrors(guild_id)
const { mutate: clear_errors } = useClearGuildErrorsMutation()

function navigateToGuide(guide: GSErrorGuide) {
  let guide_uri = '/guides'

  switch (guide) {
    case GSErrorGuide.BASIC:
      guide_uri += '/basic'
      break
    case GSErrorGuide.GENERATOR:
      guide_uri += '/generator'
      break
    case GSErrorGuide.TEMPLATE:
      guide_uri += '/template'
      break
    case GSErrorGuide.INTERFACE:
      guide_uri += '/interface'
      break
    case GSErrorGuide.VOICE_ROLE:
      guide_uri += '/voice-role'
      break
  }

  navigateTo(guide_uri, { open: { target: '_blank' } })
}
</script>
