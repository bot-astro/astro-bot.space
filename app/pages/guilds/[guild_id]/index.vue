<template>
  <div class="flex flex-col">
    <DashboardSettingsSaveToast
      :open="guild_settings_edited"
      :loading="save_guild_settings_pending || save_guild_profile_pending"
      @save="save_all"
      @reset="() => (m_guild_settings = useClone(guild_settings))"
    />

    <!-- intro -->
    <div class="flex items-center gap-4">
      <IconSettings class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="guild_info" class="dashboard-section-title">{{
          guild_info.name
        }}</span>
        <Skeleton v-else class="h-10 w-72" />

        <span class="dashboard-section-description">{{
          $t('overview.description')
        }}</span>
      </div>
    </div>

    <div class="mt-12 flex flex-wrap gap-4">
      <div
        class="group flex max-w-none items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90 md:max-w-96"
        @click="navigateTo(`${$route.fullPath}/generators`)"
      >
        <IconGenerator
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span
            class="text-heading group-hover:text-foreground-link-standout"
            >{{ $t('overview.shortcuts.generators.title') }}</span
          >
          <span class="text-description">{{
            $t('overview.shortcuts.generators.description')
          }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </div>

      <div
        class="group flex max-w-none items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90 md:max-w-96"
        @click="navigateTo(`${$route.fullPath}/interfaces`)"
      >
        <IconInterface
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span
            class="text-heading group-hover:text-foreground-link-standout"
            >{{ $t('overview.shortcuts.interfaces.title') }}</span
          >
          <span class="text-description">{{
            $t('overview.shortcuts.interfaces.description')
          }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </div>

      <div
        class="group flex max-w-none items-center gap-4 rounded-md bordered bg-background-container p-3 hover:cursor-pointer hover:bg-background-container/90 md:max-w-96"
        @click="navigateTo(`${$route.fullPath}/voice-roles`)"
      >
        <IconVoiceRole
          class="size-5 shrink-0 group-hover:stroke-foreground-link-standout"
        />
        <div class="flex flex-col">
          <span
            class="text-heading group-hover:text-foreground-link-standout"
            >{{ $t('overview.shortcuts.voice_roles.title') }}</span
          >
          <span class="text-description">{{
            $t('overview.shortcuts.voice_roles.description')
          }}</span>
        </div>
        <div class="grow" />
        <IconDropdown
          class="size-5 shrink-0 -rotate-90 group-hover:text-foreground-link-standout"
        />
      </div>
    </div>

    <!-- interactive content -->
    <div class="mt-12 flex flex-col gap-12">
      <div class="groups-wrapper">
        <span class="text-group-name">{{ $t('overview.settings.group') }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('overview.settings.language.title')"
            :description="$t('overview.settings.language.description')"
          >
            <Select v-if="m_guild_settings" v-model="m_guild_settings.locale">
              <SelectTrigger class="w-48">
                <SelectValue aria-label="value">
                  <span class="flex items-center gap-2">
                    <span class="text-base leading-none">{{
                      flags[m_guild_settings.locale]
                    }}</span>
                    {{ language_name(m_guild_settings.locale) }}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="l in available_locales"
                    :key="l.code"
                    :value="l.code"
                  >
                    <span class="flex items-center gap-2">
                      <span class="text-base leading-none">{{
                        flags[l.code]
                      }}</span>
                      {{ l.name }}
                    </span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Skeleton v-else class="h-10 w-48" />
          </GroupSetting>
          <GroupSetting :heading="$t('overview.settings.require_admin.title')">
            <template #description>
              <span class="text-description">
                {{ $t('overview.settings.require_admin.description') }}
                <span class="text-destructive">{{
                  $t('overview.settings.require_admin.recommendation')
                }}</span>
              </span>
            </template>
            <Switch v-model:checked="require_admin_perms" />
          </GroupSetting>
          <GroupSetting
            :heading="$t('overview.settings.slash_permissions.title')"
            :description="$t('overview.settings.slash_permissions.description')"
          >
            <Button
              target="_blank"
              to="https://discord.com/blog/slash-commands-permissions-discord-apps-bots"
            >
              {{ $t('overview.settings.slash_permissions.button') }}
            </Button>
          </GroupSetting>
        </div>
      </div>

      <div v-if="guild_settings" class="groups-wrapper">
        <span class="text-group-name">{{ $t('overview.ultimate.group') }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('overview.ultimate.title')"
            :description="
              $t(
                isGuildUltimate(guild_settings)
                  ? 'overview.ultimate.status_upgraded'
                  : 'overview.ultimate.status_not_upgraded',
              )
            "
          >
            <template #heading-action>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ButtonText
                      destructive
                      :loading="is_refresh_entitlements_pending"
                    >
                      <Icon
                        name="fluent:arrow-sync-12-regular"
                        class="size-5"
                        @click="
                          () => refresh_entitlements({ guild_id: guild_id! })
                        "
                      />
                    </ButtonText>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{{ $t('overview.ultimate.refresh_tooltip') }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </template>

            <ButtonDestructive
              v-if="isGuildUltimate(guild_settings)"
              :loading="downgrade_guild_loading"
              @click="on_downgrade_clicked"
            >
              {{ $t('common.downgrade') }}
            </ButtonDestructive>
            <ButtonUltimate
              v-else
              :loading="upgrade_guild_loading"
              @click="upgrade_dialog_open = true"
            >
              {{ $t('common.upgrade') }}
            </ButtonUltimate>

            <DashboardUpgradeDialog
              v-model:open="upgrade_dialog_open"
              @on-upgrade="
                (sub_id) => {
                  upgrade_dialog_open = false
                  upgrade_guild({
                    guild_id: guild_id!,
                    subscription_id: sub_id,
                  })
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
            <Dialog v-model:open="downgrade_on_discord_dialog_open">
              <DialogContent>
                <div class="flex flex-col gap-2">
                  <p class="text-center text-xl">
                    {{ $t('overview.ultimate.downgrade_title') }}
                  </p>

                  <div>
                    <p>{{ $t('overview.ultimate.downgrade_on_discord') }}</p>
                  </div>

                  <div class="mt-8 flex flex-col justify-end gap-2 sm:flex-row">
                    <ButtonSecondary
                      class="w-full sm:w-min"
                      @click="
                        navigateTo(
                          'https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ',
                          { open: { target: '_blank' } },
                        )
                      "
                    >
                      {{ $t('overview.ultimate.official_guide') }}
                    </ButtonSecondary>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </GroupSetting>
        </div>
      </div>

      <div v-if="m_guild_settings" class="groups-wrapper">
        <span class="text-group-name">{{ $t('overview.profile.group') }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('overview.profile.nickname.title')"
            :description="$t('overview.profile.nickname.description')"
          >
            <template #bottom-action>
              <input
                v-model="profile_nickname"
                placeholder="Astro"
                type="text"
                class="grow"
                maxlength="32"
              />
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('overview.profile.bio.title')"
            :description="$t('overview.profile.bio.description')"
          >
            <template #bottom-action>
              <textarea
                v-model="profile_bio"
                :placeholder="$t('overview.profile.bio.placeholder')"
                class="min-h-24 grow resize-y"
                maxlength="190"
              />
            </template>
          </GroupSetting>

          <DashboardInterfaceImageSetting
            :heading="$t('overview.profile.avatar.title')"
            :description="$t('overview.profile.avatar.description')"
            :url="m_guild_settings.avatar_url"
            :disabled="false"
            :empty-label="$t('overview.profile.using_default')"
            @preview="preview_image_url = m_guild_settings!.avatar_url"
            @choose="open_media_dialog('PROFILE_AVATAR')"
            @remove="m_guild_settings!.avatar_url = null"
          />

          <DashboardInterfaceImageSetting
            :heading="$t('overview.profile.banner.title')"
            :description="$t('overview.profile.banner.description')"
            :url="m_guild_settings.banner_url"
            :disabled="false"
            :empty-label="$t('overview.profile.using_default')"
            @preview="preview_image_url = m_guild_settings!.banner_url"
            @choose="open_media_dialog('PROFILE_BANNER')"
            @remove="m_guild_settings!.banner_url = null"
          />
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{ $t('overview.danger.group') }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('overview.danger.clear_cache.title')"
            :description="$t('overview.danger.clear_cache.description')"
          >
            <AlertDialog>
              <AlertDialogTrigger>
                <ButtonDestructive
                  :loading="is_clear_temporary_vcs_cache_pending"
                >
                  {{ $t('common.clear_cache') }}
                </ButtonDestructive>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{{
                    $t('overview.danger.clear_cache.confirm_title')
                  }}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {{ $t('overview.danger.clear_cache.confirm_description') }}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{{
                    $t('common.go_back')
                  }}</AlertDialogCancel>
                  <AlertDialogAction
                    :destructive="true"
                    :loading="is_clear_temporary_vcs_cache_pending"
                    @click="clear_temporary_vcs_cache({ guild_id: guild_id! })"
                  >
                    {{ $t('common.clear_cache') }}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </GroupSetting>
        </div>
      </div>
    </div>

    <DashboardMediaDialog
      v-model:open="media_dialog_open"
      :type="media_dialog_type"
      @select="on_media_select"
      @deleted="on_media_deleted"
    />

    <AlertDialog
      :open="preview_image_url != null"
      @update:open="(o) => !o && (preview_image_url = null)"
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle class="truncate">{{
            preview_image_url ? image_name(preview_image_url) : ''
          }}</AlertDialogTitle>
        </AlertDialogHeader>
        <img
          v-if="preview_image_url"
          :src="preview_image_url"
          :alt="image_name(preview_image_url)"
          class="max-h-96 w-full rounded object-contain"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>{{ $t('common.close') }}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script lang="ts" setup>
import { navigateTo } from '#imports'
import useClone from '~/composables/useClone'
import isGuildUltimate from '~/utils/isGuildUltimate'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import type { GuildSettings } from '~/types/guild-settings/guild_settings'
import type { LocaleObject } from '@nuxtjs/i18n'
import { deepEqual } from 'fast-equals'
import type { DashboardSection } from '~/types/dashboard'
import { useToast } from '~/components/ui/toast'
import type { Media, MediaType } from '~/types/media'
import { useRefreshGuildEntitlementsMutation } from '~/data/astro/mutations/useRefreshGuildEntitlementsMutation'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 1,
    name: 'dashboard.sections.overview',
    icon: 'astro:settings',
    description: 'Overview Description',
  } as DashboardSection,
})

const { t, locales } = useI18n()
const available_locales = computed(() => locales.value as LocaleObject[])
const flags: Record<string, string> = {
  'en-US': '🇺🇸',
  it: '🇮🇹',
  de: '🇩🇪',
  fr: '🇫🇷',
  'es-ES': '🇪🇸',
  'pt-BR': '🇧🇷',
  id: '🇮🇩',
  ko: '🇰🇷',
  th: '🇹🇭',
  ar: '🇸🇦',
  fil: '🇵🇭',
}
const language_name = (code: string) =>
  available_locales.value.find((l) => l.code === code)?.name ?? code

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.guild.title') }),
  meta: [
    { name: 'description', content: t('meta.guild.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.guild.title') }),
    },
    { property: 'og:description', content: t('meta.guild.description') },
    { property: 'og:url', content: 'https://astro-bot.space/guilds' },
  ],
}))

const { toast } = useToast()
const guild_id = useGuildId()
const guild_info = useGuildInfo()

const upgrade_dialog_open = ref(false)
const downgrade_on_discord_dialog_open = ref(false)

const { data: guild_settings, error: guild_settings_error } =
  useGuildSettings(guild_id)
const m_guild_settings = ref<GuildSettings | undefined>(undefined)
const guild_settings_edited = ref(false)

const require_admin_perms = computed({
  get() {
    return !(m_guild_settings.value?.allow_missing_admin_perm ?? false)
  },
  set(required) {
    if (m_guild_settings.value) {
      m_guild_settings.value.allow_missing_admin_perm = !required
    }
  },
})

// empty inputs are stored as null so that they match the saved settings
const profile_nickname = computed({
  get: () => m_guild_settings.value?.nickname ?? '',
  set(value) {
    if (m_guild_settings.value) {
      m_guild_settings.value.nickname = value || null
    }
  },
})
const profile_bio = computed({
  get: () => m_guild_settings.value?.bio ?? '',
  set(value) {
    if (m_guild_settings.value) {
      m_guild_settings.value.bio = value || null
    }
  },
})

watch(
  guild_settings,
  (new_settings) => {
    if (new_settings) {
      m_guild_settings.value = useClone(new_settings)
    }
  },
  { deep: true, immediate: true },
)

watch(
  m_guild_settings,
  (new_settings) => {
    if (!guild_settings.value || !new_settings) {
      guild_settings_edited.value = false
    } else {
      guild_settings_edited.value = !deepEqual(
        new_settings,
        guild_settings.value,
      )
    }
  },
  { deep: true, immediate: true },
)

/////////////////
/// MUTATIONS ///
/////////////////
const {
  isPending: save_guild_settings_pending,
  error: save_guild_settings_error,
  mutate: save_guild_settings,
} = useGuildSettingsMutation()
const {
  isPending: save_guild_profile_pending,
  error: save_guild_profile_error,
  mutate: save_guild_profile,
} = useUpdateGuildProfileMutation()
const {
  mutate: upgrade_guild,
  isPending: upgrade_guild_loading,
  error: upgrade_guild_error,
} = useGuildUpgradeMutation()
const {
  mutate: downgrade_guild,
  isPending: downgrade_guild_loading,
  error: downgrade_guild_error,
} = useGuildDowngradeMutation()
const {
  mutate: clear_temporary_vcs_cache,
  isPending: is_clear_temporary_vcs_cache_pending,
  error: clear_temporary_vcs_cache_error,
} = useClearTemporaryVCsCacheMutation()
const {
  mutate: refresh_entitlements,
  isPending: is_refresh_entitlements_pending,
  error: refresh_entitlements_error,
} = useRefreshGuildEntitlementsMutation()

// the profile and the settings have separate endpoints, the profile goes first
// so that the settings response already contains the new profile
function save_all() {
  const settings = guild_settings.value
  const edited = m_guild_settings.value
  if (!settings || !edited || !guild_id.value) return

  const gid = guild_id.value
  const settings_changed =
    edited.allow_missing_admin_perm !== settings.allow_missing_admin_perm ||
    edited.locale !== settings.locale
  const profile_changed =
    edited.nickname !== settings.nickname ||
    edited.bio !== settings.bio ||
    edited.avatar_url !== settings.avatar_url ||
    edited.banner_url !== settings.banner_url

  const save_settings = () =>
    save_guild_settings({
      guild_id: gid,
      guild_settings_rb: {
        allow_missing_admin_perms: edited.allow_missing_admin_perm,
        locale: edited.locale,
      },
    })

  if (profile_changed) {
    save_guild_profile(
      {
        guild_id: gid,
        profile_rb: {
          nickname: edited.nickname,
          bio: edited.bio,
          avatar_url: edited.avatar_url,
          banner_url: edited.banner_url,
        },
      },
      { onSuccess: () => settings_changed && save_settings() },
    )
  } else if (settings_changed) {
    save_settings()
  }
}

/// IMAGES ///
const media_dialog_open = ref(false)
const media_dialog_type = ref<MediaType>('PROFILE_AVATAR')
const preview_image_url = ref<string | null>(null)

const { data: guild_media } = useGuildMedia(guild_id)

const image_name = (url: string) =>
  guild_media.value?.find((m) => m.url == url)?.file_name ??
  decodeURIComponent(url.split('?')[0]!.split('/').pop() ?? url)

function open_media_dialog(type: MediaType) {
  media_dialog_type.value = type
  media_dialog_open.value = true
}

function on_media_select(media: Media) {
  if (m_guild_settings.value) {
    if (media_dialog_type.value == 'PROFILE_AVATAR') {
      m_guild_settings.value.avatar_url = media.url
    } else {
      m_guild_settings.value.banner_url = media.url
    }
  }
  media_dialog_open.value = false
}

function on_media_deleted(media: Media) {
  if (!m_guild_settings.value) return

  if (m_guild_settings.value.avatar_url == media.url) {
    m_guild_settings.value.avatar_url = null
  }
  if (m_guild_settings.value.banner_url == media.url) {
    m_guild_settings.value.banner_url = null
  }
}

const on_downgrade_clicked = () => {
  if (guild_settings.value) {
    if (guild_settings.value.upgraded_by_user_id !== null) {
      downgrade_guild({ guild_id: guild_id.value! })
    } else {
      downgrade_on_discord_dialog_open.value = true
    }
  }
}

////////////////////
/// ERROR TOASTS ///
////////////////////
watch(upgrade_guild_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(downgrade_guild_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(clear_temporary_vcs_cache_error, (e) => {
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

  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(save_guild_settings_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(save_guild_profile_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(refresh_entitlements_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
