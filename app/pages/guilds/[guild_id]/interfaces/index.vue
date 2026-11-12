<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconInterface class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">{{
          $t('interfaces.title')
        }}</span>
        <span class="dashboard-section-description">{{
          $t('interfaces.description')
        }}</span>
      </div>
      <div class="grow" />
      <Button
        :loading="create_interface_loading"
        @click="
          () => {
            if (
              guild_settings &&
              !is_ultimate &&
              guild_settings.interfaces.length > 0
            )
              ultimate_required_dialog_open = true
            else create_interface_dialog_open = true
          }
        "
      >
        <Icon name="fluent:add-12-regular" /> {{ $t('common.create') }}
      </Button>
    </div>

    <Dialog v-model:open="create_interface_dialog_open">
      <DialogContent>
        <div class="flex flex-col gap-2">
          <p class="text-center text-xl">{{ $t('interfaces.create_title') }}</p>

          <div class="mt-4 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <span class="text-heading">{{ $t('common.channel') }}</span>
                <span class="text-description">{{
                  $t('interfaces.channel_description')
                }}</span>
              </div>
              <Select v-model:model-value="create_interface_channel_id">
                <SelectTrigger>
                  <SelectValue aria-label="value">{{
                    guild_channels?.find(
                      (c) => c.id === create_interface_channel_id,
                    )?.name ?? $t('interfaces.select_channel')
                  }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="channel in (guild_channels ?? []).filter(
                        (c) => c.type == 0,
                      )"
                      :key="channel.id"
                      :value="channel.id"
                    >
                      {{ channel.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="mt-8 flex flex-col justify-end gap-2 sm:flex-row">
            <Button
              :loading="create_interface_loading"
              @click="
                () => {
                  if (!create_interface_channel_id) return
                  create_interface({
                    guild_id: guild_id!,
                    channel_id: create_interface_channel_id,
                  })
                  create_interface_dialog_open = false
                  create_interface_channel_id = ''
                }
              "
            >
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
      {{ $t('interfaces.ultimate_required') }}
    </DashboardUltimateRequiredDialog>

    <div class="flex w-full items-center justify-center">
      <div v-if="guild_settings && guild_channels" class="w-full">
        <div
          v-if="guild_settings.interfaces.length > 0"
          class="group-setting p-0"
        >
          <div
            v-for="(inter, i) in guild_settings.interfaces"
            :key="inter.message_id"
            class="flex flex-col"
          >
            <div class="flex items-center gap-4 px-4 py-6">
              <IconInterface class="size-4 shrink-0" />
              <div class="flex flex-col gap-2 sm:gap-0">
                <div class="flex flex-col gap-0 sm:flex-row sm:gap-2">
                  <span class="text-foreground-secondary">{{
                    $t('voice_roles.channel_label')
                  }}</span>
                  <div class="vertical-center gap-2">
                    {{
                      guild_channels.find((c) => c.id == inter.channel_id)
                        ?.name ?? $t('common.deleted_channel')
                    }}
                  </div>
                </div>

                <div class="flex flex-col gap-0 sm:flex-row sm:gap-2">
                  <span
                    v-if="
                      guild_channels.find((c) => c.id == inter.channel_id)
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
                      guild_channels.find((c) => c.id == inter.channel_id)
                        ?.parent_name
                    "
                    class="vertical-center gap-2"
                  >
                    {{
                      guild_channels.find((c) => c.id == inter.channel_id)
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
                  @click="navigateTo(`${$route.fullPath}/${inter.message_id}`)"
                >
                  {{ $t('common.manage') }}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <ButtonDestructive :loading="delete_interface_loading">
                      {{ $t('common.delete') }}
                    </ButtonDestructive>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{{
                        $t('interfaces.delete_confirm_title')
                      }}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {{ $t('interfaces.delete_confirm_description') }}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{{
                        $t('common.go_back')
                      }}</AlertDialogCancel>
                      <AlertDialogAction
                        :destructive="true"
                        :loading="delete_interface_loading"
                        @click="
                          delete_interface({
                            guild_id: guild_id!,
                            interface_id: inter.message_id,
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
              v-if="i !== guild_settings.interfaces.length - 1"
              class="w-full bordered"
            />
          </div>
        </div>
        <div
          v-else
          class="flex min-h-full flex-col items-center justify-center gap-4"
        >
          <span class="text-center text-xl font-semibold">{{
            $t('interfaces.none')
          }}</span>
          <Button
            :loading="create_interface_loading"
            @click="create_interface_dialog_open = true"
          >
            <Icon name="fluent:add-12-regular" /> {{ $t('common.create') }}
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
import DashboardUltimateRequiredDialog from '~/components/dashboard/DashboardUltimateRequiredDialog.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 4,
    name: 'dashboard.sections.interfaces',
    icon: 'astro:interface',
    description: 'Interfaces Description',
  } as DashboardSection,
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.interfaces.title') }),
  meta: [
    { name: 'description', content: t('meta.interfaces.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.interfaces.title') }),
    },
    { property: 'og:description', content: t('meta.interfaces.description') },
    {
      property: 'og:url',
      content: 'https://astro-bot.space/guilds/interfaces',
    },
  ],
}))

const { toast } = useToast()
const guild_id = useGuildId()
const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, error: guild_settings_error } =
  useGuildSettings(guild_id)
const {
  mutate: create_interface,
  isPending: create_interface_loading,
  error: create_interface_error,
} = useCreateInterfaceMutation()
const {
  mutate: delete_interface,
  isPending: delete_interface_loading,
  error: delete_interface_error,
} = useDeleteInterfaceMutation()
const { mutate: upgrade_guild, error: upgrade_guild_error } =
  useGuildUpgradeMutation()

const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const create_interface_dialog_open = ref(false)
const create_interface_channel_id = ref('')
const ultimate_required_dialog_open = ref(false)
const upgrade_dialog_open = ref(false)

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

watch(create_interface_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(delete_interface_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
