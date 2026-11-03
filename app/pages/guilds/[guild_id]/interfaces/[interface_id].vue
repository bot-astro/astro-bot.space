<template>
  <div class="mb-64 flex flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconInterface class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="guild_channels" class="dashboard-section-title">
          {{
            guild_channels.find((c) => c.id == interface_settings?.channel_id)
              ?.name ?? 'Deleted channel'
          }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description"
          >Manage the message and buttons of this interface!</span
        >
      </div>
      <div class="grow" />
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonDestructive :loading="delete_interface_loading">
            Delete
          </ButtonDestructive>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              >Are you sure you want to delete the interface?</AlertDialogTitle
            >
            <AlertDialogDescription>
              This action cannot be un-done and you wont be able to restore this
              interface!
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
                  interface_id: interface_id!,
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
</template>

<script setup lang="ts">
import { navigateTo } from '#imports'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import type { DashboardSection } from '~/types/dashboard'
import type { GSInterface } from '~/types/guild-settings/interface'
import { useToast } from '~/components/ui/toast'

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
  title: 'Interface - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content: 'Edit the message and buttons of your interface',
    },
    {
      property: 'og:title',
      content: 'Interface - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content: 'Edit the message and buttons of your interface',
    },
    { property: 'og:url', content: 'https://astro-bot.space/guilds/interface' },
  ],
})

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
const interface_id = ref(route.params.interface_id as string | undefined)

watch(
  () => route.params,
  (params) => {
    interface_id.value = params.interface_id as string | undefined
  },
)

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, error: guild_settings_error } =
  useGuildSettings(guild_id)

const interface_settings = computed<GSInterface | undefined>(() =>
  guild_settings.value?.interfaces?.find(
    (i) => i.message_id == interface_id.value,
  ),
)

/// MUTATIONS ///
const {
  mutate: delete_interface,
  isPending: delete_interface_loading,
  error: delete_interface_error,
  isSuccess: delete_interface_success,
} = useDeleteInterfaceMutation()

/// SUCCESS ACTIONS ///
watch(guild_settings_error, (e) => {
  if (
    e instanceof AError &&
    e.code === AErrorCode.BOT_NOT_IN_GUILD &&
    guild_id.value
  ) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(delete_interface_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/interfaces`)
  }
})

/// ERROR TOASTS ///
watch(delete_interface_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
