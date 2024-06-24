import { deepEqual } from 'fast-equals'

import type { components } from '#nuxt-api-party/api'

export const useDashboardStore = defineStore('dashboard', () => {
  const currentGuildId = ref(useRoute().params.guildId as string)

  const guilds = ref<components['schemas']['DiscordGuild'][]>([])
  const currentGuild = computed(() => guilds.value.find(g => g.id === currentGuildId.value))

  if (import.meta.dev) {
    import('~/guilds.json').then(r => guilds.value = r.guilds)
  } else {
    $api('/dashboard/guilds').then(r => guilds.value = r)
  }

  const settings = ref<components['schemas']['GuildData'][]>([])

  const currentSettings = computed(async () => {
    if (!currentGuildId.value) {
      return null
    }
    
    const _settings = settings.value.find(s => s.guild_id === currentGuildId.value)
    if (!_settings) {
      const r = await $api('/dashboard/guilds/{guild_id}/data', {
        path: {
          guild_id: currentGuildId.value
        }
      })
      settings.value = [...settings.value, r]
      return r
    } else {
      return _settings
    }
  })

  const currentSettingsMutable = ref<components['schemas']['GuildData'] | null>(null)
  watch(currentSettings, async (newSettings) => {
    const result = await newSettings
    if (result) {
      currentSettingsMutable.value = useClone(result)
    }
  }, { deep: true })

  const settingsEdited = ref(false)
  watch(currentSettingsMutable, async (newSettings) => {
    const oldSettings = await currentSettings.value
    settingsEdited.value = !deepEqual(newSettings, oldSettings)
  }, { deep: true })
  const settingsLoading = ref(false)

  const saveSettings = async () => {
    if (!settingsEdited) {
      return
    }

    settingsLoading.value = true
    const r = await $api('/dashboard/guilds/{guild_id}/data', {
      path: {
        guild_id: currentGuildId.value
      },
      method: 'POST',
      body: {
        allow_missing_admin_perm: currentSettingsMutable.value?.allow_missing_admin_perm
      }
    })
    settingsLoading.value = false

    settings.value.splice(settings.value.findIndex(s => s.guild_id === r.guild_id), 1, r)
  }

  const sections = ref(useRouter()
    .getRoutes()
    .filter(r => r.path.startsWith('/guilds/:guildId()'))
    .map(r => Object.assign({ path: r.path }, r.meta.section) as DashboardSection)
    .filter(r => r.name)
    .sort((a, b) => a.id - b.id))

  const currentSection = ref(sections.value.find(s => s.path.replace(':guildId()', currentGuildId.value) === useRoute().path) ?? sections.value[0])

  const setContext = (section?: DashboardSection, guildId?: string) => {
    // TODO check if settings are edited

    if (section) {
      currentSection.value = section
    }

    if (guildId) {
      currentGuildId.value = guildId
    }

    navigateTo(currentSection.value.path.replace(':guildId()', guildId ?? currentGuildId.value))
  }

  return {
    currentGuildId,

    guilds,
    currentGuild,

    settings,
    currentSettings,
    currentSettingsMutable,

    settingsEdited,
    settingsLoading,

    saveSettings,

    sections,
    currentSection,

    setContext
  }
})
