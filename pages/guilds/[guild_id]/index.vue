<template>
  <div class="flex flex-col">
    <!-- intro -->
    <div class="flex items-center gap-4">
      <Icon name="lucide:server" class="size-10" />
      <div class="flex flex-col">
        <span v-if="guild_info" class="text-title-no-font font-bold">{{ guild_info.name }}</span>
        <Skeleton v-else class="h-10 w-72" />

        <span>Manage your server's basic settings</span>
      </div>
    </div>

    <!-- interactive content -->
    <div class="flex flex-col gap-12">
      <div class="flex flex-col gap-6 mt-12">
        <div class="flex flex-col gap-1">
          <span class="text-group-name">SETTINGS</span>
          <div class="flex flex-col gap-2">
            <GroupSetting heading="Require Admin permission">
              <template #description>
              <span>
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
              <Button target="_blank" to="https://support.discord.com/hc/en-us/articles/4644915651095-Command-Permissions">
                Manage on Discord
              </Button>
            </GroupSetting>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-group-name">ULTIMATE</span>
        <div class="flex flex-col gap-2">
          <GroupSetting
            heading="Ultimate server"
            :description="`Your server is currently ${guild_settings?.upgraded_by_user_id ? 'upgraded' : 'not upgraded'} to ultimate`"
          >
            <Button>
              Upgrade
            </Button>
          </GroupSetting>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-group-name">DANGEROUS</span>
        <div class="flex flex-col gap-2">
          <GroupSetting heading="Reset temporary voice channels cache"
                        description="If you are encountering weird issues with temporary voice channels, expecially when the incremental names for the channels start with a wrong number or skip some, hit this button, otherwise try to avoid this!">
            <ButtonDestructive>Clear cache</ButtonDestructive>
          </GroupSetting>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type DashboardSection from "~/types/dashboard";
import type {GuildSettings} from "~/types/guild-settings/guild_settings";
import {deepEqual} from "fast-equals";
import {toast} from "vue-sonner";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 1,
    name: 'Overview',
    icon: 'i-lucide-home',
    description: 'Overview Description',
  } as DashboardSection
})

const guild_id = useGuildId()
const guild_info = useGuildInfo()

const { data: guild_settings, error: guild_settings_error, isPending: guild_settings_pending } = useGuildSettings(guild_id)
const m_guild_settings = ref<GuildSettings | undefined>(undefined)

// keep in sync when we update the values from the server
watch(guild_settings, (new_settings) => {
  if (new_settings) {
    m_guild_settings.value = useClone(new_settings)
  }
}, { deep: true })

/// whether the original settings have been edited and need to be saved
const guild_settings_edited = ref(false)
const guild_settings_edited_toast = ref<string | number | undefined>(undefined)

watch(m_guild_settings, (new_settings) => {
  if (!guild_settings.value || !new_settings) {
    guild_settings_edited.value = false
  } else {
    guild_settings_edited.value = !deepEqual(new_settings, guild_settings.value)
  }
}, { deep: true })


// save settings
const { isPending: save_guild_settings_pending, isError: save_guild_settings_error, mutate: save_guild_settings } = useGuildSettingsMutation()

watch(guild_settings_edited, (edited) => {
  if (edited) {
    console.debug('showing settings save toast')

    guild_settings_edited_toast.value = toast('Careful - you have unsaved changes!', {
      position: 'bottom-center',
      duration: Infinity,
      dismissible: true,
      onDismiss(toast) {
        m_guild_settings.value = guild_settings.value
      },
      action: {
        label: 'Save changes',
        onClick: () => {
          if (m_guild_settings.value && guild_id.value) {
            save_guild_settings({
              guild_id: guild_id.value,
              guild_settings_rb: {
                allow_missing_admin_perm: m_guild_settings.value.allow_missing_admin_perm
              }
            })
          }
        }
      }
    })
  } else {
    console.debug('hiding settings save toast')

    toast.dismiss(guild_settings_edited_toast.value)
  }
})



// modifiable settings
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
</script>
