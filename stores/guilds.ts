import { defineStore } from 'pinia'
import type { DashboardGuild } from '~/types/api/dashboard/DashboardGuild'

interface GuildsState {
  guilds: DashboardGuild[]
  isError: boolean
  isLoading: boolean
  lastFetch?: number

  selectedGuildId?: string
  selectedGuildSettings?: DashboardGuildSettings
  isSelectedGuildError: boolean
  isSelectedGuildSettingsLoading: boolean
}

export const useGuildsStore = defineStore({
  id: 'guildsStore',
  persist: true,
  state: (): GuildsState => ({
    guilds: [],
    isError: false,
    isLoading: false,
    lastFetch: undefined,
    selectedGuildId: undefined,
    selectedGuildSettings: undefined,
    isSelectedGuildError: false,
    isSelectedGuildSettingsLoading: false
  }),
  getters: {
    selectedGuild(state) {
      return state.guilds.find(guild => guild.id === state.selectedGuildId)
    }
  },
  actions: {
    async fetchIfOutdated() {
      const currentTimestamp = Date.now()

      if (this.lastFetch === undefined || (currentTimestamp - this.lastFetch > 3600000))
        await this.fetch()
    },
    async fetch() {
      const { data, error, pending } = await useApiFetch<DashboardGuild[]>(ApiEndpoints.GUILDS)

      if (pending.value === true) {
        this.isLoading = true
        this.isError = false
      }
      else if (data.value !== null) {
        this.isError = false
        this.guilds = data.value
        this.isLoading = false
        this.lastFetch = Date.now()
      }
      else if (error.value !== null) {
        this.isLoading = false
        this.isError = true
        console.error('Failed fetching guilds', error.value)
      }
    },
    async select(id: string | undefined) {
      this.selectedGuildId = id
      
      if (id !== undefined) {
        const { data, error, pending } = await useApiFetch<DashboardGuildSettings>(ApiEndpoints.GUILD_SETTINGS(id))

        if (pending.value === true) {
          this.isSelectedGuildSettingsLoading = true
          this.isSelectedGuildError = false
        }
        else if (data.value !== null) {
          this.isSelectedGuildError = false
          this.selectedGuildSettings = data.value
          this.isSelectedGuildSettingsLoading = false
        }
        else if (error.value !== null) {
          this.isSelectedGuildSettingsLoading = false
          this.isSelectedGuildError = true
          console.error('Failed fetching guild settings', error.value)
        }
      }
    },
  },
})
