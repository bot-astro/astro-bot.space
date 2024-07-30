import {useGuilds} from "~/data/astro/query/useGuilds";

export const useGuildStore = defineStore('guild', () => {
  const guild_id = ref(useRoute().params.guild_id as string | undefined)

  const guild_info = computed(() => {
    if (guild_id.value !== undefined) {
      const guilds = useGuilds()
      return guilds.data.value?.find((g) => g.id === guild_id.value)
    } else {
      return undefined
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
    guild_id,
    guild_info
  }
})