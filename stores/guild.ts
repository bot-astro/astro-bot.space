import {useGuilds} from "~/data/astro/query/useGuilds";
import type {DashboardSection} from "~/types/dashboard";
import {useGuildSettings} from "~/data/astro/query/useGuildSettings";

export const useGuildStore = defineStore('guild', () => {
  const current_guild_id = ref(useRoute().params.guild_id as string | undefined)

  /// DASHBOARD SECTION ///
  const sections = ref(useRouter()
    .getRoutes()
    .filter(r => r.path.startsWith('/guilds/:guild_id()'))
    .map(r => Object.assign({ path: r.path }, r.meta.section) as DashboardSection)
    .filter(r => r.name)
    .sort((a, b) => a.id - b.id)
  )

  const current_section = ref(sections.value.find(s => s.path.replace(':guild_id()', current_guild_id.value ?? 'none') === useRoute().path) ?? sections.value[0])

  const set_section_and_guild = (section?: DashboardSection, guild_id?: string) => {
    if (section) {
      current_section.value = section
    }

    if (guild_id === undefined && current_guild_id === undefined) {
      // just in case, but this shouldn't be used
      navigateTo('/guilds')
    } else {
      navigateTo(current_section.value.path.replace(':guild_id()', guild_id ?? current_guild_id.value ?? ''))
    }
  }


  /// GUILD INFO ///
  const guild_info = computed(() => {
    if (current_guild_id.value !== undefined) {
      const guilds = useGuilds()
      const data =  guilds.data.value?.find(g => g.id === current_guild_id.value)

      return {
        is_pending: guilds.isPending,
        error: guilds.error,
        data: data
      }
    } else {
      return null
    }
  })


  /// GUILD SETTINGS ///
  const guild_settings = computed(() => {
    if (current_guild_id.value !== undefined) {
      const settings = useGuildSettings(current_guild_id.value)

      return {
        is_pending: settings.isPending,
        error: settings.error,
        data: settings.data
      }
    } else {
      return null
    }
  })

  /*
  TODO:
  - settings
  - modifiable_settings
  - is_modified
  - save function
  - reset function
   */

  return {
    // guild id
    current_guild_id,
    // sections
    sections,
    current_section,
    // context setter
    set_section_and_guild,


    guild_info
  }
})