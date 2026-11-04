<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconVoiceRole class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">{{
          $t('voice_roles.title')
        }}</span>
        <span class="dashboard-section-description">{{
          $t('voice_roles.description')
        }}</span>
      </div>
      <div class="grow" />
      <Button
        :loading="create_voice_role_loading"
        @click="create_voice_role_clicked"
      >
        <Icon name="fluent:add-12-regular" />
        {{ $t('common.create') }}
      </Button>
    </div>

    <Dialog v-model:open="create_voice_role_dialog_open">
      <DialogContent>
        <div class="flex flex-col gap-2">
          <p class="text-center text-xl">
            {{ $t('voice_roles.create_title') }}
          </p>

          <div class="groups-wrapper mt-4 max-h-[70vh] overflow-y-scroll">
            <div class="groups-container">
              <GroupSetting :heading="$t('common.channel')">
                <template #description>
                  <span class="whitespace-pre-line text-foreground-secondary">
                    {{ $t('voice_roles.channel_description') }}
                  </span>
                </template>
                <template #bottom-action>
                  <Select
                    v-model:model-value="create_voice_role_channel_id"
                    @update:model-value="
                      (id) => (create_voice_role_channel_id = id)
                    "
                  >
                    <SelectTrigger>
                      <SelectValue
                        :placeholder="$t('voice_roles.select_channel')"
                        aria-label="value"
                        >{{
                          guild_channels?.find(
                            (c) => c.id == create_voice_role_channel_id,
                          )?.name ?? ''
                        }}</SelectValue
                      >
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="channel in guild_channels!.filter(
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
                    v-model:model-value="create_voice_role_role_id"
                    @update:model-value="
                      (role_id) => (create_voice_role_role_id = role_id)
                    "
                  >
                    <SelectTrigger>
                      <SelectValue
                        :placeholder="$t('voice_roles.select_role')"
                        aria-label="value"
                        >{{
                          guild_roles?.find(
                            (r) => r.id == create_voice_role_role_id,
                          )?.name ?? ''
                        }}</SelectValue
                      >
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
                    v-model:model-value="create_voice_role_action"
                    required
                    @update:model-value="
                      (v) => (create_voice_role_action = v as GSVoiceRoleAction)
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
                <Switch v-model:checked="create_voice_role_permanent" />
              </GroupSetting>
            </div>
          </div>

          <div class="mt-8 flex flex-col justify-end gap-2 sm:flex-row">
            <Button @click="create_voice_role_form_submission">
              {{ $t('common.create') }}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <DashboardUltimateRequiredDialog
      v-model:model-value="ultimate_required_dialog_open"
      @upgrade="
        () => {
          ultimate_required_dialog_open = false
          upgrade_dialog_open = true
        }
      "
    >
      {{ $t('voice_roles.ultimate_required') }}
    </DashboardUltimateRequiredDialog>

    <div class="flex w-full items-center justify-center">
      <div
        v-if="guild_settings && guild_channels && guild_roles"
        class="w-full"
      >
        <div
          v-if="guild_settings.connections.length > 0"
          class="group-setting p-0"
        >
          <div
            v-for="(voice_role, i) in guild_settings.connections"
            :key="i"
            class="flex flex-col"
          >
            <div class="flex items-center gap-4 px-4 py-6">
              <IconVoiceRole class="size-4 shrink-0" />
              <div class="flex flex-col gap-2 sm:gap-0">
                <div class="flex flex-col gap-0 sm:flex-row sm:gap-2">
                  <span class="text-foreground-secondary">{{
                    $t('voice_roles.channel_label')
                  }}</span>
                  <div class="vertical-center gap-2">
                    {{
                      guild_channels.find((c) => c.id == voice_role.id)?.name ??
                      $t('common.deleted_channel')
                    }}
                  </div>
                </div>
                <div class="flex flex-col gap-0 sm:flex-row sm:gap-2">
                  <span class="text-foreground-secondary">{{
                    $t('voice_roles.role_label')
                  }}</span>
                  <div class="vertical-center gap-2">
                    <span
                      :class="`size-3 min-h-3 min-w-3 rounded-full`"
                      :style="`background-color: #${guild_roles.find((r) => r.id == voice_role.role_id)?.color?.toString(16) ?? '000000'}`"
                    />
                    {{
                      guild_roles.find((r) => r.id == voice_role.role_id)
                        ?.name ?? $t('voice_roles.deleted_role')
                    }}
                  </div>
                </div>

                <div class="flex flex-col gap-0 sm:flex-row sm:gap-2">
                  <span
                    v-if="
                      guild_channels.find((c) => c.id == voice_role.id)
                        ?.parent_name
                    "
                    class="text-foreground-secondary"
                    >{{ $t('voice_roles.category_label') }}
                  </span>
                  <span v-else class="text-foreground-secondary">{{
                    $t('voice_roles.no_category')
                  }}</span>
                  <div
                    v-if="
                      guild_channels.find((c) => c.id == voice_role.id)
                        ?.parent_name
                    "
                    class="vertical-center gap-2"
                  >
                    {{
                      guild_channels.find((c) => c.id == voice_role.id)
                        ?.parent_name
                    }}
                  </div>
                </div>
              </div>
              <div class="grow" />
              <div
                class="flex flex-col items-center gap-2 md:flex-row md:gap-4"
              >
                <Button
                  @click="navigateTo(`${$route.fullPath}/${voice_role.id}`)"
                >
                  {{ $t('common.manage') }}
                </Button>
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
                      <AlertDialogCancel>{{
                        $t('common.go_back')
                      }}</AlertDialogCancel>
                      <AlertDialogAction
                        :destructive="true"
                        :loading="delete_voice_role_loading"
                        @click="
                          delete_voice_role({
                            guild_id: guild_id!,
                            channel_id: voice_role.id,
                          })
                        "
                      >
                        {{ $t('common.delete') }}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <hr
              v-if="i !== guild_settings.connections.length - 1"
              class="w-full bordered"
            />
          </div>
        </div>
        <div
          v-else
          class="mt-12 flex min-h-full flex-col items-center justify-center gap-4"
        >
          <span class="text-center text-xl font-semibold">{{
            $t('voice_roles.none')
          }}</span>
          <Button
            :loading="create_voice_role_loading"
            @click="create_voice_role_clicked"
          >
            <Icon name="fluent:add-12-regular" />
            {{ $t('common.create') }}
          </Button>
        </div>
      </div>
      <div v-else-if="guild_settings_error" class="grow">
        <span class="center text-foreground-destructive">{{
          $t('common.error_generic')
        }}</span>
      </div>
      <div v-else class="center">
        <IconLoading />
      </div>
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

<script lang="ts" setup>
import { navigateTo } from '#imports'
import isGuildUltimate from '~/utils/isGuildUltimate'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import type { DashboardSection } from '~/types/dashboard'
import { useToast } from '~/components/ui/toast'
import { Select, SelectItem } from '~/components/ui/select'
import { GSVoiceRoleAction } from '~/types/guild-settings/voice_role'
import IconVoiceRole from '~/components/icon/IconVoiceRole.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 5,
    name: 'dashboard.sections.voice_roles',
    icon: 'astro:voice-role',
    description: 'Voice Role description',
  } as DashboardSection,
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.voice_roles.title') }),
  meta: [
    { name: 'description', content: t('meta.voice_roles.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.voice_roles.title') }),
    },
    {
      property: 'og:description',
      content: t('meta.voice_roles.description'),
    },
    {
      property: 'og:url',
      content: 'https://astro-bot.space/guilds/voice_role',
    },
  ],
}))

const { toast } = useToast()
const guild_id = useGuildId()
const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_roles } = useGuildRoles(guild_id)
const { data: guild_settings, error: guild_settings_error } =
  useGuildSettings(guild_id)
const {
  mutate: create_voice_role,
  isPending: create_voice_role_loading,
  error: create_voice_role_error,
} = useCreateVoiceRoleMutation()
const {
  mutate: delete_voice_role,
  isPending: delete_voice_role_loading,
  error: delete_voice_role_error,
} = useDeleteVoiceRoleMutation()
const { mutate: upgrade_guild, error: upgrade_guild_error } =
  useGuildUpgradeMutation()

const create_voice_role_dialog_open = ref(false)
const create_voice_role_channel_id = ref<string | undefined>(undefined)
const create_voice_role_role_id = ref<string | undefined>(undefined)
const create_voice_role_action = ref<GSVoiceRoleAction>(
  GSVoiceRoleAction.ASSIGN,
)
const create_voice_role_permanent = ref<boolean>(false)

const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const ultimate_required_dialog_open = ref(false)
const upgrade_dialog_open = ref(false)

const create_voice_role_clicked = () => {
  if (
    guild_settings.value &&
    !is_ultimate.value &&
    guild_settings.value.connections.length > 0
  )
    ultimate_required_dialog_open.value = true
  else create_voice_role_dialog_open.value = true
}

const create_voice_role_form_submission = () => {
  if (!create_voice_role_channel_id.value || !create_voice_role_role_id.value) {
    toast({
      description: t('voice_roles.select_channel_and_role'),
      variant: 'destructive',
    })
  } else {
    create_voice_role({
      guild_id: guild_id.value!,
      voice_role_settings: {
        id: create_voice_role_channel_id.value,
        role_id: create_voice_role_role_id.value,
        action: create_voice_role_action.value,
        permanent: create_voice_role_permanent.value,
      },
    })

    create_voice_role_dialog_open.value = false
  }
}

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

watch(create_voice_role_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
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
</script>
