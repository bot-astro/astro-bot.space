<template>
  <div class="flex flex-col">
    <DashboardSettingsSaveToast
      :open="guild_settings_edited"
      :loading="save_guild_settings_pending"
      @save="save_guild_settings({ guild_id: guild_id!, guild_settings_rb: { allow_missing_admin_perm: m_guild_settings!.allow_missing_admin_perm } })"
      @reset="() => m_guild_settings = useClone(guild_settings)"
    />

    <!-- intro -->
    <div class="flex items-center gap-4">
      <IconSettings class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="guild_info" class="dashboard-section-title">{{ guild_info.name }}</span>
        <Skeleton v-else class="h-10 w-72" />

        <span class="dashboard-section-description">Manage your server's basic settings</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-4 mt-12">
      <div
        class="max-w-none md:max-w-96 group flex items-center gap-4 rounded-md px-3 py-3 bordered bg-background-container hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo(`${$route.fullPath}/generators`)"
      >
        <IconGenerator class="size-5 group-hover:stroke-foreground-link-standout shrink-0" />
        <div class="flex flex-col">
          <span class="text-heading group-hover:text-foreground-link-standout">Configure temporary voice channels</span>
          <span class="text-description">Head over to the generators section to configure temporary voice channels</span>
        </div>
        <div class="grow" />
        <IconDropdown class="size-5 -rotate-90 group-hover:text-foreground-link-standout shrink-0" />
      </div>

      <div
        class="max-w-none md:max-w-96 group flex items-center gap-4 rounded-md px-3 py-3 bordered bg-background-container hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo(`/guides/interface`, { open: { target: '_blank' } })"
      >
        <IconInterface class="size-5 group-hover:stroke-foreground-link-standout shrink-0" />
        <div class="flex flex-col">
          <span class="text-heading group-hover:text-foreground-link-standout">Create an interface</span>
          <span class="text-description">Create an interface to let your users manage their channel with simple buttons</span>
        </div>
        <div class="grow" />
        <IconDropdown class="size-5 -rotate-90 group-hover:text-foreground-link-standout shrink-0" />
      </div>

      <div
        class="max-w-none md:max-w-96 group flex items-center gap-4 rounded-md px-3 py-3 bordered bg-background-container hover:cursor-pointer hover:bg-background-container/90"
        @click="navigateTo(`${$route.fullPath}/voice-roles`)"
      >
        <IconVoiceRole class="size-5 group-hover:stroke-foreground-link-standout shrink-0" />
        <div class="flex flex-col">
          <span class="text-heading group-hover:text-foreground-link-standout">Setup voice roles</span>
          <span class="text-description">Connect voice channels to roles to enhance the user experience in your server!</span>
        </div>
        <div class="grow" />
        <IconDropdown class="size-5 -rotate-90 group-hover:text-foreground-link-standout shrink-0" />
      </div>
    </div>

    <!-- interactive content -->
    <div class="flex flex-col gap-12 mt-12">
      <div class="groups-wrapper">
        <span class="text-group-name">SETTINGS</span>
        <div class="groups-container">
          <GroupSetting heading="Require Admin permission">
            <template #description>
                <span class="text-description">
                  Disabling this will make Astro ignore permission issues.
                  <span class="text-destructive">It's recommended to keep this on!</span>
                </span>
            </template>
            <Switch v-model:checked="require_admin_perms" />
          </GroupSetting>
          <GroupSetting
            heading="Slash command permissions"
            description="You can restrict access to Astro slash commands using Discord permissions directly!"
          >
            <Button target="_blank" to="https://discord.com/blog/slash-commands-permissions-discord-apps-bots">
              Manage on Discord
            </Button>
          </GroupSetting>
        </div>
      </div>

      <div v-if="guild_settings" class="groups-wrapper">
        <span class="text-group-name">ULTIMATE</span>
        <div class="groups-container">
          <GroupSetting
            heading="Ultimate server"
            :description="`Your server is currently ${isGuildUltimate(guild_settings) ? 'upgraded' : 'not upgraded'} to ultimate`"
          >
            <template #heading-action>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ButtonText destructive :loading="is_refresh_entitlements_pending">
                      <Icon name="fluent:arrow-sync-12-regular" class="size-5" @click="() => refresh_entitlements({ guild_id: guild_id! })" />
                    </ButtonText>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refresh Discord subscriptions data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </template>

            <ButtonDestructive :loading="downgrade_guild_loading" v-if="isGuildUltimate(guild_settings)" @click="on_downgrade_clicked">
              Downgrade
            </ButtonDestructive>
            <ButtonUltimate :loading="upgrade_guild_loading" v-else @click="upgrade_dialog_open = true">
              Upgrade
            </ButtonUltimate>


            <DashboardUpgradeDialog
              v-model:open="upgrade_dialog_open"
              @onUpgrade="(sub_id) => { upgrade_dialog_open = false; upgrade_guild({ guild_id: guild_id!, subscription_id: sub_id }) }"
              @onPurchaseOnWebsite="() => navigateTo('/ultimate', { external: true, open: { target: '_blank' } })"
              @onPurchaseOnDiscord="() => navigateTo('/discord-ultimate', { external: true, open: { target: '_blank' } })"
            />
            <Dialog v-model:open="downgrade_on_discord_dialog_open">
              <DialogContent>
                <div class="flex flex-col gap-2">
                  <p class="text-xl text-center">
                    Downgrade server
                  </p>

                  <div>
                    <p>This server was upgraded to Ultimate via the Discord store. You need to cancel the subscription on Discord to downgrade from Ultimate.</p>
                  </div>

                  <div class="flex flex-col sm:flex-row justify-end mt-8 gap-2">
                    <ButtonSecondary
                      class="w-full sm:w-min"
                      @click="navigateTo(
                        'https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ',
                        { open: { target: '_blank' } }
                        )"
                    >
                      Official guide
                    </ButtonSecondary>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">DANGEROUS</span>
        <div class="groups-container">
          <GroupSetting
            heading="Reset temporary voice channels cache"
            description="If you are encountering weird issues with temporary voice channels, especially when the incremental names for the channels start with a wrong number or skip some, hit this button, otherwise try to avoid this!"
          >
            <AlertDialog>
              <AlertDialogTrigger>
                <ButtonDestructive :loading="is_clear_temporary_vcs_cache_pending">
                  Clear cache
                </ButtonDestructive>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to clear the cache?</AlertDialogTitle>
                  <AlertDialogDescription>
                    If you do this all the currently existing temporary voice channels wont be recognized by Astro anymore and you will need to delete them manually!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go back</AlertDialogCancel>
                  <AlertDialogAction
                    :destructive="true"
                    :loading="is_clear_temporary_vcs_cache_pending"
                    @click="clear_temporary_vcs_cache({ guild_id: guild_id! })"
                  >
                    Clear cache
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </GroupSetting>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {GuildSettings} from "~/types/guild-settings/guild_settings";
import {deepEqual} from "fast-equals";
import type {DashboardSection} from "~/types/dashboard";
import {useToast} from "~/components/ui/toast";
import {useRefreshGuildEntitlementsMutation} from "~/data/astro/mutations/useRefreshGuildEntitlementsMutation";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 1,
    name: 'Overview',
    icon: 'astro:settings',
    description: 'Overview Description',
  } as DashboardSection
})

useHead({
  title: "Dashboard - Astro - Temporary Voice Channels for your Discord!",
  meta: [
    { name: 'description', content: 'Configure all Astro settings for your server with the powerful and intuitive dashboard' },
    { property: 'og:title', content: 'Dashboard - Astro - Temporary Voice Channels for your Discord!' },
    { property: 'og:description', content: 'Configure all Astro settings for your server with the powerful and intuitive dashboard' },
    { property: 'og:url', content: 'https://astro-bot.space/guilds' }
  ]
})

const { toast } = useToast()
const guild_id = useGuildId()
const guild_info = useGuildInfo()

const upgrade_dialog_open = ref(false)
const downgrade_on_discord_dialog_open = ref(false)

const { data: guild_settings, error: guild_settings_error } = useGuildSettings(guild_id)
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
  }
})

watch(guild_settings, (new_settings) => {
  if (new_settings) {
    m_guild_settings.value = useClone(new_settings)
  }
}, { deep: true, immediate: true })

watch(m_guild_settings, (new_settings) => {
  if (!guild_settings.value || !new_settings) {
    guild_settings_edited.value = false
  } else {
    guild_settings_edited.value = !deepEqual(new_settings, guild_settings.value)
  }
}, { deep: true, immediate: true })


/////////////////
/// MUTATIONS ///
/////////////////
const { isPending: save_guild_settings_pending, error: save_guild_settings_error, mutate: save_guild_settings } = useGuildSettingsMutation()
const { mutate: upgrade_guild, isPending: upgrade_guild_loading, error: upgrade_guild_error } = useGuildUpgradeMutation()
const { mutate: downgrade_guild, isPending: downgrade_guild_loading, error: downgrade_guild_error } = useGuildDowngradeMutation()
const { mutate: clear_temporary_vcs_cache, isPending: is_clear_temporary_vcs_cache_pending, error: clear_temporary_vcs_cache_error } = useClearTemporaryVCsCacheMutation()
const { mutate: refresh_entitlements, isPending: is_refresh_entitlements_pending, error: refresh_entitlements_error } = useRefreshGuildEntitlementsMutation()

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
watch(upgrade_guild_error, e => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(downgrade_guild_error, e => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(clear_temporary_vcs_cache_error, e => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(guild_settings_error, e => {
  if (e instanceof AstroApiError && e.code == AstroApiErrorCode.ASTRO_NOT_IN_GUILD && guild_id.value) {
    useInvite().invite_to_guild(guild_id.value)
  }

  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(save_guild_settings_error, e => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(refresh_entitlements_error, e => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})
</script>
