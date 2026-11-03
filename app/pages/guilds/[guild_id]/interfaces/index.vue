<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconInterface class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">Interfaces</span>
        <span class="dashboard-section-description"
          >Manage the interfaces of your server here!</span
        >
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
        <Icon name="fluent:add-12-regular" />
        Create
      </Button>
    </div>

    <Dialog v-model:open="create_interface_dialog_open">
      <DialogContent>
        <div class="flex flex-col gap-2">
          <p class="text-center text-xl">Create interface</p>

          <div class="mt-4 flex flex-col gap-6">
            <div class="groups-wrapper">
              <div class="groups-container">
                <GroupSetting
                  heading="Channel"
                  description="The text channel in which the interface message is sent"
                >
                  <template #bottom-action>
                    <Select v-model:model-value="create_interface_channel_id">
                      <SelectTrigger>
                        <SelectValue aria-label="value">{{
                          guild_channels?.find(
                            (c) => c.id === create_interface_channel_id,
                          )?.name ?? 'Select a channel'
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
                  </template>
                </GroupSetting>
              </div>
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
              Create
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
      Ultimate is required to have more than 1 interface. Upgrade your server to
      Ultimate to create more interfaces.
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
              <div class="flex flex-col">
                <span class="text-md">
                  {{
                    guild_channels.find((c) => c.id == inter.channel_id)
                      ?.name ?? 'Deleted channel'
                  }}
                </span>
                <span class="text-foreground-secondary">
                  {{ inter.buttons.length }}
                  {{ inter.buttons.length === 1 ? 'button' : 'buttons' }}
                </span>
              </div>
              <div class="grow" />
              <div
                class="flex flex-col items-center gap-2 md:flex-row md:gap-4"
              >
                <Button
                  @click="navigateTo(`${$route.fullPath}/${inter.message_id}`)"
                >
                  Manage
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <ButtonDestructive :loading="delete_interface_loading">
                      Delete
                    </ButtonDestructive>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle
                        >Are you sure you want to delete the
                        interface?</AlertDialogTitle
                      >
                      <AlertDialogDescription>
                        This action cannot be un-done and you wont be able to
                        restore this interface!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Go back</AlertDialogCancel>
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
                        Delete
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
          <span class="text-center text-xl font-semibold"
            >You didn't create any interface yet!</span
          >
          <Button
            :loading="create_interface_loading"
            @click="create_interface_dialog_open = true"
          >
            <Icon name="fluent:add-12-regular" />
            Create
          </Button>
        </div>
      </div>
      <div v-else-if="guild_settings_error" class="grow">
        <span class="center text-foreground-destructive"
          >Something went wrong, please try again later</span
        >
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
    name: 'Interfaces',
    icon: 'astro:interface',
    description: 'Interfaces Description',
  } as DashboardSection,
})

useHead({
  title: 'Interfaces - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content: 'Create, view and delete interfaces',
    },
    {
      property: 'og:title',
      content:
        'Interfaces - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content: 'Create, view and delete interfaces',
    },
    {
      property: 'og:url',
      content: 'https://astro-bot.space/guilds/interfaces',
    },
  ],
})

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
