<template>
  <div class="mb-64 flex flex-col gap-8">
    <DashboardSettingsSaveToast
      :open="voice_role_settings_edited"
      :loading="update_voice_role_pending"
      @save="
        update_voice_role({
          guild_id: guild_id!,
          channel_id: voice_role_id!,
          voice_role_settings: m_voice_role_settings!,
        })
      "
      @reset="m_voice_role_settings = useClone(voice_role_settings)"
    />

    <div class="flex items-center gap-4">
      <IconVoiceRole class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span
          v-if="guild_channels && guild_roles && voice_role_settings"
          class="dashboard-section-title"
        >
          {{
            guild_channels.find((c) => c.id == voice_role_id)?.name ??
            $t('common.deleted_channel')
          }}
          <span class="text-foreground-secondary">x</span> @{{
            guild_roles.find((r) => r.id == voice_role_settings!.role_id)
              ?.name ?? $t('voice_roles.deleted_role')
          }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description">{{
          $t('voice_roles.detail.description')
        }}</span>
      </div>
      <div class="grow" />
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonDestructive :loading="delete_voice_role_loading">
            {{ $t('common.delete') }}
          </ButtonDestructive>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{{
              $t('voice_roles.delete_confirm_title')
            }}</AlertDialogTitle>
            <AlertDialogDescription>
              {{ $t('voice_roles.delete_confirm_description') }}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{{ $t('common.go_back') }}</AlertDialogCancel>
            <AlertDialogAction
              :destructive="true"
              :loading="delete_voice_role_loading"
              @click="
                delete_voice_role({
                  guild_id: guild_id!,
                  channel_id: voice_role_id!,
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
      v-if="
        m_voice_role_settings != undefined &&
        guild_channels != undefined &&
        guild_roles != undefined
      "
      class="flex flex-col gap-12"
    >
      <div class="groups-wrapper">
        <span class="text-group-name">{{ $t('overview.settings.group') }}</span>
        <div class="groups-container">
          <GroupSetting :heading="$t('common.channel')">
            <template #description>
              <span class="whitespace-pre-line text-foreground-secondary">
                {{ $t('voice_roles.detail.channel_description') }}
              </span>
            </template>
            <template #bottom-action>
              <Select
                v-model:model-value="m_voice_role_settings.id"
                @update:model-value="(id) => (m_voice_role_settings!.id = id)"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{
                    guild_channels?.find(
                      (c) => c.id == m_voice_role_settings!.id,
                    )?.name ?? ''
                  }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="channel in guild_channels.filter(
                        (c) => c.type == 2 || c.type == 4 || c.type == 13,
                      )"
                      :key="channel.id"
                      :value="channel.id"
                    >
                      {{ channel.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('common.role')"
            :description="$t('voice_roles.role_description')"
          >
            <template #bottom-action>
              <Select
                v-model:model-value="m_voice_role_settings.role_id"
                @update:model-value="
                  (role_id) => (m_voice_role_settings!.role_id = role_id)
                "
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{
                    guild_roles?.find(
                      (r) => r.id == m_voice_role_settings!.role_id,
                    )?.name ?? ''
                  }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <DashboardRoleSelectItems
                      :roles="guild_roles!"
                      :guild_id="guild_id"
                    />
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('common.action')"
            :description="$t('voice_roles.action_description')"
          >
            <template #bottom-action>
              <Select
                v-model:model-value="m_voice_role_settings.action"
                required
                @update:model-value="
                  (v) =>
                    (m_voice_role_settings!.action = v as GSVoiceRoleAction)
                "
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="v in Object.values(GSVoiceRoleAction)"
                      :key="v"
                      :value="v"
                    >
                      {{ $t(`voice_roles.actions.${v.toLowerCase()}`) }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('common.permanent')"
            :description="$t('voice_roles.permanent_description')"
          >
            <Switch v-model:checked="m_voice_role_settings.permanent" />
          </GroupSetting>
        </div>
      </div>
    </div>

    <div
      v-else-if="guild_settings_error"
      class="center text-foreground-destructive"
    >
      {{ $t('common.error_generic') }}
    </div>
    <div v-else-if="guild_settings_pending" class="center">
      <IconLoading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#imports'
import useClone from '~/composables/useClone'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import { deepEqual } from 'fast-equals'
import { useToast } from '~/components/ui/toast'
// enum is used as a value in the template
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  GSVoiceRoleAction,
  type GSVoiceRole,
} from '~/types/guild-settings/voice_role'
import { Select, SelectItem } from '~/components/ui/select'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.voice_role.title') }),
  meta: [
    { name: 'description', content: t('meta.voice_role.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.voice_role.title') }),
    },
    {
      property: 'og:description',
      content: t('meta.voice_role.description'),
    },
    {
      property: 'og:url',
      content: 'https://astro-bot.space/guilds/voice_role',
    },
  ],
}))

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
const voice_role_id = ref(route.params.voice_role_id as string)

watch(
  () => route.params,
  (params) => {
    voice_role_id.value = params.voice_role_id as string
  },
)

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_roles } = useGuildRoles(guild_id)
const {
  data: guild_settings,
  error: guild_settings_error,
  isPending: guild_settings_pending,
} = useGuildSettings(guild_id)

const voice_role_settings = computed(() => {
  return guild_settings.value
    ? [...guild_settings.value.connections].find(
        (c) => c.id == voice_role_id.value,
      )
    : undefined
})
const m_voice_role_settings = ref<GSVoiceRole | undefined>(undefined)
const voice_role_settings_edited = ref(false)

watch(
  voice_role_settings,
  (new_voice_role_settings) => {
    if (new_voice_role_settings) {
      m_voice_role_settings.value = useClone(new_voice_role_settings)
    }
  },
  { deep: true, immediate: true },
)

watch(
  m_voice_role_settings,
  (new_m_voice_role_settings) => {
    if (!voice_role_settings.value || !new_m_voice_role_settings) {
      voice_role_settings_edited.value = false
    } else {
      voice_role_settings_edited.value = !deepEqual(
        new_m_voice_role_settings,
        voice_role_settings.value,
      )
    }
  },
  { deep: true, immediate: true },
)

/// MUTATIONS ///
const {
  mutate: delete_voice_role,
  isPending: delete_voice_role_loading,
  error: delete_voice_role_error,
  isSuccess: delete_voice_role_success,
} = useDeleteVoiceRoleMutation()
const {
  mutate: update_voice_role,
  isPending: update_voice_role_pending,
  error: update_voice_role_error,
} = useUpdateVoiceRoleMutation()

/// SUCCESS ACTIONS ///
watch(delete_voice_role_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/voice-roles`)
  }
})

/// ERROR TOASTS ///
watch(guild_settings_error, (e) => {
  if (
    e instanceof AError &&
    e.code === AErrorCode.BOT_NOT_IN_GUILD &&
    guild_id.value
  ) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(delete_voice_role_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(update_voice_role_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
