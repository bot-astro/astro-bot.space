import {useGuilds} from "~/data/astro/query/useGuilds";
import type {GuildSettings} from "~/types/guild-settings/guild_settings";
import {deepEqual} from "fast-equals";
import {useGuildSettingsMutation} from "~/data/astro/mutations/useGuildSettingsMutation";
import type {GuildSettingsRB} from "~/types/guild-settings/request-bodies/guild_settings_rb";

export const useGuildStore = defineStore('guild', () => {
//   const current_guild_id = ref(useRoute().params.guild_id as string | undefined)
//
//   /// DASHBOARD SECTION ///
//   const sections = ref(useRouter()
//     .getRoutes()
//     .filter(r => r.path.startsWith('/guilds/:guild_id()'))
//     .map(r => Object.assign({ path: r.path }, r.meta.section) as DashboardSection)
//     .filter(r => r.name)
//     .sort((a, b) => a.id - b.id)
//   )
//
//   const current_section = ref(sections.value.find(s => s.path.replace(':guild_id()', current_guild_id.value ?? 'none') === useRoute().path) ?? sections.value[0])
//
//   const set_section_and_guild = (section?: DashboardSection, guild_id?: string) => {
//     if (section) {
//       current_section.value = section
//     }
//
//     if (guild_id === undefined && current_guild_id === undefined) {
//       // just in case, but this shouldn't be used
//       navigateTo('/guilds')
//     } else {
//       navigateTo(current_section.value.path.replace(':guild_id()', guild_id ?? current_guild_id.value ?? ''))
//     }
//   }
//
//
//   /// GUILD INFO ///
//   const guild_info = computed(() => {
//     if (current_guild_id.value !== undefined) {
//       const guilds = useGuilds()
//       const data =  computed(() => guilds.data.value?.find(g => g.id === current_guild_id.value))
//
//       return {
//         is_pending: guilds.isPending,
//         error: guilds.error,
//         data: data
//       }
//     } else {
//       return null
//     }
//   })
//
//
//   /// GUILD SETTINGS ///
//   const guild_settings_edited = ref(false)
//
//   const guild_settings = computed(() => {
//     if (current_guild_id.value !== undefined) {
//       const settings = useGuildSettings(current_guild_id.value)
//
//       return {
//         is_pending: settings.isPending,
//         error: settings.error,
//         data: settings.data
//       }
//     } else {
//       return null
//     }
//   })
//
//   const m_guild_settings = ref<GuildSettings | null>(null)
//
//   watch(guild_settings, (new_settings) => {
//     if (new_settings !== null && new_settings.data.value !== undefined) {
//       m_guild_settings.value = useClone(new_settings.data.value)
//     }
//   }, { deep: true })
//
//   watch(m_guild_settings, (new_settings) => {
//     const old_settings = guild_settings.value?.data.value ?? null
//
//     if (old_settings === null || new_settings === null) {
//       guild_settings_edited.value = false
//     } else {
//       guild_settings_edited.value = !deepEqual(new_settings, old_settings)
//     }
//   }, { deep: true })
//
//   const update_guild_settings = computed(() => {
//     if (!guild_settings_edited.value || !current_guild_id.value || m_guild_settings.value === null) {
//       return null
//     }
//
//     const guild_id = current_guild_id.value
//     const guild_settings_rb: GuildSettingsRB = {
//       allow_missing_admin_perm: m_guild_settings.value.allow_missing_admin_perm
//     }
//
//     const mutation = useGuildSettingsMutation()
//
//     const mutate = () => {
//       mutation.mutate({
//         guild_id,
//         guild_settings_rb
//       })
//     }
//
//     return {
//       ...mutation,
//       mutate
//     }
//   })
//
//   /*
//   TODO:
//   - settings
//   - modifiable_settings
//   - is_modified
//   - save function
//   - reset function
//    */
//
//   return {
//     // guild id
//     current_guild_id,
//     // sections
//     sections,
//     current_section,
//     // context setter
//     set_section_and_guild,
//
//
//     guild_info,
//
//     guild_settings,
//     m_guild_settings,
//     guild_settings_edited,
//     update_guild_settings
//   }
})