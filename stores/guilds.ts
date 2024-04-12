import {defineStore} from 'pinia'
import type {DashboardGuild} from '~/types/api/dashboard/DashboardGuild'

interface GuildsState {
  guilds: DashboardGuild[]
  isError: boolean
}

export const useGuildsStore = defineStore({
  id: 'guildsStore',
  state: (): GuildsState => ({
    guilds: [],
    isError: false,
  }),
  actions: {
    async fetch() {
      const { $apiFetch } = useNuxtApp()
      try {
        this.guilds = await $apiFetch<DashboardGuild[]>(ApiEndpoints.GUILDS)
      } catch(e) {
        this.isError = true
        console.error('Failed fetching guilds', error)
      }
    },
  },
})
