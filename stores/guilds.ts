import {defineStore} from 'pinia'
import type {DashboardGuild} from '~/types/api/dashboard/DashboardGuild'

interface GuildsState {
  guilds: DashboardGuild[]
  isError: boolean,
  lastFetch?: number
}

export const useGuildsStore = defineStore({
  id: 'guildsStore',
  state: (): GuildsState => ({
    guilds: [],
    isError: false,
    lastFetch: undefined
  }),
  actions: {
    async fetchIfOutdated() {
      const currentTimestamp = Date.now()

      if (this.lastFetch === undefined || (currentTimestamp - this.lastFetch > 3600000)) {
        await this.fetch()
      }
    },
    async fetch() {
      const { data, error} = await useApiFetch<DashboardGuild[]>(ApiEndpoints.GUILDS)

      if (data.value !== null) {
        this.guilds = data.value
        this.lastFetch = Date.now()
      } else if (error.value !== null) {
        this.isError = true
        console.error('Failed fetching guilds', error.value)
      }
    },
  },
})
