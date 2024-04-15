import { defineStore } from 'pinia'
import type { DashboardGuild } from '~/types/api/dashboard/DashboardGuild'

interface GuildState {
  guild?: DashboardGuild
}

export const useGuildStore = defineStore({
  id: 'guildStore',
  state: (): GuildState => ({
    guild: undefined,
  }),
  actions: {
    set(guild: DashboardGuild | undefined) {
      this.guild = guild
    },
  },
})
