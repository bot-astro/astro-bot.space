import type {DashboardSection} from "~/types/dashboard";

export default function() {
  const current_guild_id = useGuildId()

  const all_sections = ref(useRouter()
    .getRoutes()
    .filter(r => r.path.startsWith('/guilds/:guild_id()'))
    .map(r => Object.assign({ path: r.path }, r.meta.section) as DashboardSection)
  )

  const sections= ref(useRouter()
    .getRoutes()
    .filter(r => r.path.startsWith('/guilds/:guild_id()'))
    .map(r => Object.assign({ path: r.path }, r.meta.section) as DashboardSection)
    .filter(r => r.name)
    .sort((a, b) => a.id - b.id)
  )

  const current_section = ref(all_sections.value.find(s => useRoute().path.startsWith(s.path.replace(':guild_id()', current_guild_id.value ?? 'none'))) ?? sections.value[0])

  const set_section_and_guild = (section?: DashboardSection, guild_id?: string) => {
    if (section) {
      current_section.value = section
    }

    navigateTo(current_section.value.path.replace(':guild_id()', guild_id ?? current_guild_id.value ?? ''))
  }

  return {
    sections,
    current_section,
    set_section_and_guild
  }
}