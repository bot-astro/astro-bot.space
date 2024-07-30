import { deepEqual } from 'fast-equals'

import type { components } from '#nuxt-api-party/api'

interface GuildErrorWrapper {
  guild_id: string
  errors: components['schemas']['GuildError'][]
}
// test

export const useApiDashboardStore = defineStore('api-dashboard', () => {
  // const currentGuildId = computed(() => useRoute().params.guildId as string)
  const currentGuildId = ref(useRoute().params.guildId as string)

  const guilds = ref<components['schemas']['DiscordGuild'][]>([])
  const currentGuild = computed(() => guilds.value.find(g => g.id === currentGuildId.value))

  // if (import.meta.dev) {
  //   import('~/guilds.json').then(r => guilds.value = r.default.guilds)
  // } else {
  //   $api('/dashboard/guilds').then(r => guilds.value = r)
  // }

  $api('/dashboard/guilds').then(r => {guilds.value = r; console.log(r) })

  const loading = ref(false)
  const edited = ref(false)

  /**
   * Settings
   */

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

  watch(currentSettingsMutable, async (newSettings) => {
    const oldSettings = await currentSettings.value
    edited.value = !deepEqual(newSettings, oldSettings)
  }, { deep: true })

  const saveSettings = async () => {
    if (!edited) {
      return
    }

    loading.value = true

    const r = await $api('/dashboard/guilds/{guild_id}/data', {
      path: {
        guild_id: currentGuildId.value
      },
      method: 'POST',
      body: {
        allow_missing_admin_perm: currentSettingsMutable.value?.allow_missing_admin_perm
      }
    })
    settings.value.splice(settings.value.findIndex(s => s.guild_id === r.guild_id), 1, r)

    loading.value = false
  }

  /**
   * Errors
   */

  const errors = ref<GuildErrorWrapper[]>([])

  const currentErrors = computed(async () => {
    if (!currentGuildId.value) {
      return null
    }

    const wrapper = errors.value.find(w => w.guild_id === currentGuildId.value)
    if (!wrapper) {
      const r = await $api('/dashboard/guilds/{guild_id}/errors', {
        path: {
          guild_id: currentGuildId.value
        }
      })
      errors.value = [...errors.value, { guild_id: currentGuildId.value, errors: r }]
      return r
    } else {
      return wrapper?.errors
    }
  })

  const clearErrors = async () => {
    loading.value = true

    await $api('/dashboard/guilds/{guild_id}/errors', {
      path: {
        guild_id: currentGuildId.value
      },
      method: 'DELETE'
    })

    loading.value = false
  }

  /**
   * Generators
   */

  const currentGenerators = computed(async () => {
    const settings = await currentSettings.value

    if (!settings) {
      return null
    }

    return settings.generators
  })

  const currentGeneratorId = ref(useRoute().params.generatorId as string)
  // const currentGeneratorId = computed(() => useRoute().params.generatorId as string)

  const currentGenerator = computed(async () => {
    const generators = await currentGenerators.value

    if (!generators) {
      return null
    }

    return generators.find(g => g.id === currentGeneratorId.value)
  })

  const currentGeneratorMutable = ref<components['schemas']['GeneratorData'] | null>(null)
  watch(currentGenerator, async (newGenerator) => {
    const result = await newGenerator
    if (result) {
      currentGeneratorMutable.value = useClone(result)
    }
  })

  watch(currentGeneratorMutable, async (newGenerator) => {
    const oldGenerator = await currentGenerator.value
    edited.value = !deepEqual(newGenerator, oldGenerator)
  })

  // CREATE
  const createGenerator = async () => {
    if (!currentGeneratorMutable.value) {
      return
    }

    loading.value = true

    const r = await $api('/dashboard/guilds/{guild_id}/data/generator', {
      path: {
        guild_id: currentGuildId.value
      },
      method: 'POST'
    })
    settings.value.splice(settings.value.findIndex(s => s.guild_id === r.guild_id), 1, r)

    loading.value = false
  }

  // MUTATE
  const saveGenerator = async () => {
    if (!edited.value || !currentGeneratorMutable.value) {
      return
    }

    loading.value = true

    const r = await $api('/dashboard/guilds/{guild_id}/data/generator/{generator_id}', {
      path: {
        guild_id: currentGuildId.value,
        generator_id: currentGeneratorId.value
      },
      method: 'POST',
      body: currentGeneratorMutable.value,
    })
    settings.value.splice(settings.value.findIndex(s => s.guild_id === r.guild_id), 1, r)

    loading.value = false
  }

  // DELETE
  const deleteGenerator = async () => {
    if (!currentGenerator.value) {
      return
    }

    loading.value = true

    await $api('/dashboard/guilds/{guild_id}/data/generator/{generator_id}', {
      path: {
        guild_id: currentGuildId.value,
        generator_id: currentGeneratorId.value
      },
      method: 'DELETE',
    })

    loading.value = false
  }

  // important: refresh guild settings after interacting with backend (separate function?)
  // versus: update local data optimistacally?

  /**
   * Saving
   */

  const save = () => {
    if (!edited.value) {
      return
    }

    switch (currentSection.value.name) {
      case 'Overview':
        saveSettings()
        break
      case 'Generators':
        saveGenerator()
      default:
        return
    }
  }

  /**
   * Sections
   */

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

    navigateTo(currentSection.value.path.replace(':guildId()', guildId ?? currentGuildId.value))
  }

  return {
    // gleneral
    guilds,
    currentGuildId,
    currentGuild,

    edited,
    loading,

    // settings
    settings,
    currentSettings,
    currentSettingsMutable,

    saveSettings,

    // errors
    currentErrors,

    clearErrors,

    // generators
    currentGenerators,
    currentGeneratorMutable,

    createGenerator,
    saveGenerator,
    deleteGenerator,

    // saving
    save,

    // sections
    sections,
    currentSection,

    setContext
  }
})
