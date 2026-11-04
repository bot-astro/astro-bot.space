<template>
  <div class="mb-64 flex flex-col gap-8">
    <DashboardSettingsSaveToast
      :open="template_settings_edited"
      :loading="update_template_pending"
      @save="
        update_template({
          guild_id: guild_id!,
          template_id: template_id!,
          template_settings: m_template_settings!,
        })
      "
      @reset="m_template_settings = useClone(template_settings)"
    />

    <div class="flex items-center gap-4">
      <IconTemplate class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="template_settings" class="dashboard-section-title">
          {{ template_settings.name }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description">{{
          $t('templates.detail.description')
        }}</span>
      </div>
      <div class="grow" />
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonDestructive :loading="delete_template_loading">
            {{ $t('common.delete') }}</ButtonDestructive
          >
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{{
              $t('templates.delete_confirm_title')
            }}</AlertDialogTitle>
            <AlertDialogDescription>
              {{ $t('templates.delete_confirm_description') }}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{{ $t('common.go_back') }}</AlertDialogCancel>
            <AlertDialogAction
              :destructive="true"
              :loading="delete_template_loading"
              @click="
                delete_template({
                  guild_id: guild_id!,
                  template_id: template_id!,
                })
              "
            >
              {{ $t('common.delete') }}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <div
      v-if="m_template_settings && guild_channels"
      class="flex flex-col gap-12"
    >
      <div class="groups-wrapper">
        <span class="text-group-name">{{ $t('templates.usage_group') }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('common.name')"
            :description="$t('templates.name_description')"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  v-model="m_template_settings.name"
                  :placeholder="$t('templates.name_placeholder')"
                  type="text"
                  class="grow"
                  minlength="1"
                  required
                />
              </div>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('templates.generators.title')"
            :description="$t('templates.generators.description')"
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                class="focus-visible:border-opacity-80 min-h-9 rounded bordered bg-background px-2.5 py-1 focus-visible:border-pink-500"
              >
                {{
                  m_template_settings.enabled_generator_ids == null
                    ? $t('templates.generators.any')
                    : m_template_settings.enabled_generator_ids.length == 0
                      ? $t('templates.generators.none')
                      : $t(
                          'templates.generators.count',
                          {
                            count:
                              m_template_settings.enabled_generator_ids.length,
                          },
                          m_template_settings.enabled_generator_ids.length,
                        )
                }}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                  :checked="m_template_settings.enabled_generator_ids == null"
                  @update:checked="
                    m_template_settings.enabled_generator_ids == null
                      ? (m_template_settings.enabled_generator_ids = [])
                      : (m_template_settings.enabled_generator_ids = null)
                  "
                >
                  {{ $t('templates.generators.any') }}
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem
                  v-for="generator in guild_settings!.generators"
                  :key="generator.id"
                  :checked="
                    m_template_settings.enabled_generator_ids != null &&
                    m_template_settings.enabled_generator_ids.some(
                      (g) => g == generator.id,
                    )
                  "
                  @update:checked="
                    () => {
                      const was_checked =
                        m_template_settings!.enabled_generator_ids != null &&
                        m_template_settings!.enabled_generator_ids.some(
                          (g) => g == generator.id,
                        )

                      if (was_checked) {
                        m_template_settings!.enabled_generator_ids =
                          m_template_settings!.enabled_generator_ids!.filter(
                            (g) => g != generator.id,
                          )
                      } else {
                        if (
                          m_template_settings!.enabled_generator_ids == null
                        ) {
                          m_template_settings!.enabled_generator_ids = []
                        }

                        m_template_settings!.enabled_generator_ids.push(
                          generator.id,
                        )
                      }
                    }
                  "
                >
                  {{
                    guild_channels!.find((c) => c.id == generator.id)?.name ??
                    $t('common.deleted_channel')
                  }}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{ $t('templates.vc_group') }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('common.name')"
            :description="$t('templates.vc_name_description')"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  :placeholder="$t('common.not_set')"
                  type="text"
                  :value="
                    m_template_settings.vc_name != null
                      ? m_template_settings.vc_name
                      : undefined
                  "
                  class="grow"
                  minlength="2"
                  maxlength="500"
                  @input="
                    ($event.target as HTMLInputElement).value
                      ? (m_template_settings.vc_name = (
                          $event.target as HTMLInputElement
                        ).value)
                      : (m_template_settings.vc_name = null)
                  "
                />
                <DashboardVariablesButton
                  :is-ultimate="is_ultimate"
                  @upgrade="upgrade_dialog_open = true"
                  @variable-select="
                    (v) =>
                      m_template_settings!.vc_name != null
                        ? (m_template_settings!.vc_name += v)
                        : (m_template_settings!.vc_name = v)
                  "
                />
              </div>
            </template>
          </GroupSetting>

          <div class="groups-container-compact">
            <GroupSetting
              :heading="$t('common.user_limit')"
              :description="$t('templates.user_limit_description')"
              compact
            >
              <template #bottom-action>
                <input
                  :placeholder="$t('common.not_set')"
                  :value="
                    m_template_settings.vc_limit != null
                      ? m_template_settings.vc_limit
                      : undefined
                  "
                  type="number"
                  min="0"
                  max="99"
                  @input="
                    ($event.target as HTMLInputElement).value
                      ? (m_template_settings.vc_limit = Number(
                          ($event.target as HTMLInputElement).value,
                        ))
                      : (m_template_settings.vc_limit = null)
                  "
                />
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('common.bitrate')"
              :description="$t('templates.bitrate_description')"
              compact
            >
              <template #bottom-action>
                <div class="vertical-center relative">
                  <input
                    :placeholder="$t('common.not_set')"
                    :value="
                      m_template_settings.vc_bitrate != null
                        ? m_template_settings.vc_bitrate / 1000
                        : undefined
                    "
                    type="number"
                    min="8"
                    max="384"
                    class="grow"
                    @input="
                      ($event.target as HTMLInputElement).value
                        ? (m_template_settings.vc_bitrate =
                            Number(($event.target as HTMLInputElement).value) *
                            1000)
                        : (m_template_settings.vc_bitrate = null)
                    "
                  />
                  <span
                    :class="
                      cn(
                        'absolute text-foreground-secondary transition-all duration-100',
                        m_template_settings.vc_bitrate == null
                          ? 'hidden'
                          : m_template_settings.vc_bitrate >= 100000
                            ? 'left-10'
                            : m_template_settings.vc_bitrate >= 10000
                              ? 'left-8'
                              : 'left-6',
                      )
                    "
                    >{{ $t('common.kbps') }}</span
                  >
                </div>
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('common.region')"
              :description="$t('templates.region_description')"
              compact
            >
              <template #bottom-action>
                <Select
                  v-model:model-value="vc_region_model"
                  @update:model-value="
                    (key) =>
                      (m_template_settings!.vc_region =
                        key !== 'no_region' ? key : null)
                  "
                >
                  <SelectTrigger>
                    <SelectValue
                      :placeholder="$t('common.not_set')"
                      aria-label="value"
                      >{{
                        m_template_settings!.vc_region
                          ? $t(`regions.${m_template_settings!.vc_region}`)
                          : undefined
                      }}</SelectValue
                    >
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="region in discord_regions"
                        :key="region.key"
                        :value="region.key"
                      >
                        {{ region.emoji }} {{ $t(`regions.${region.key}`) }}
                      </SelectItem>

                      <SelectItem value="no_region">{{
                        $t('common.not_set')
                      }}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="guild_settings_error"
      class="center text-foreground-destructive"
    >
      {{ $t('common.error_generic') }}
    </div>
    <div v-else class="center">
      <IconLoading />
    </div>

    <DashboardUpgradeDialog
      v-model:open="upgrade_dialog_open"
      @on-upgrade="
        (sub_id) => {
          upgrade_dialog_open = false
          upgrade_guild({ guild_id: guild_id!, subscription_id: sub_id })
        }
      "
      @on-purchase-on-website="
        () =>
          navigateTo('/ultimate', {
            external: true,
            open: { target: '_blank' },
          })
      "
      @on-purchase-on-discord="
        () =>
          navigateTo('/discord-ultimate', {
            external: true,
            open: { target: '_blank' },
          })
      "
    />
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#imports'
import useClone from '~/composables/useClone'
import cn from '~/utils/cn'
import isGuildUltimate from '~/utils/isGuildUltimate'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import { deepEqual } from 'fast-equals'
import { useToast } from '~/components/ui/toast'
import { Select, SelectItem } from '~/components/ui/select'
import type { GSTemplate } from '~/types/guild-settings/template'
import { discord_regions } from '~/types/discord'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.template.title') }),
  meta: [
    { name: 'description', content: t('meta.template.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.template.title') }),
    },
    { property: 'og:description', content: t('meta.template.description') },
    { property: 'og:url', content: 'https://astro-bot.space/guilds/template' },
  ],
}))

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
const template_id = ref(route.params.template_id as string | undefined)

watch(
  () => route.params,
  (params) => {
    template_id.value = params.template_id as string | undefined
  },
)

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, error: guild_settings_error } =
  useGuildSettings(guild_id)

const upgrade_dialog_open = ref(false)
const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const template_settings = computed(() => {
  return guild_settings.value
    ? [...guild_settings.value.templates].find((c) => c.id == template_id.value)
    : undefined
})
const m_template_settings = ref<GSTemplate | undefined>(undefined)
const template_settings_edited = ref(false)

watch(
  template_settings,
  (new_template_settings) => {
    if (new_template_settings) {
      m_template_settings.value = useClone(new_template_settings)
    }
  },
  { deep: true, immediate: true },
)

watch(
  m_template_settings,
  (new_m_template_settings) => {
    if (!template_settings.value || !new_m_template_settings) {
      template_settings_edited.value = false
    } else {
      template_settings_edited.value = !deepEqual(
        new_m_template_settings,
        template_settings.value,
      )
    }
  },
  { deep: true, immediate: true },
)

/// PROPERTIES ///
const vc_region_model = computed({
  get() {
    return m_template_settings.value?.vc_region != null &&
      m_template_settings.value
      ? m_template_settings.value.vc_region
      : undefined
  },
  set(value) {
    if (m_template_settings.value) {
      if (value != 'no_region' && value)
        m_template_settings.value.vc_region = value
      else m_template_settings.value.vc_region = null
    }
  },
})

/// MUTATIONS ///
const {
  mutate: delete_template,
  isPending: delete_template_loading,
  error: delete_template_error,
  isSuccess: delete_template_success,
} = useDeleteTemplateMutation()
const {
  mutate: update_template,
  isPending: update_template_pending,
  error: update_template_error,
} = useUpdateTemplateMutation()
const { mutate: upgrade_guild, error: upgrade_guild_error } =
  useGuildUpgradeMutation()

/// SUCCESS ACTIONS ///
watch(upgrade_guild_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(guild_settings_error, (e) => {
  if (
    e instanceof AError &&
    e.code === AErrorCode.BOT_NOT_IN_GUILD &&
    guild_id.value
  ) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(delete_template_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/templates`)
  }
})

/// ERROR TOASTS ///
watch(delete_template_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(update_template_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
