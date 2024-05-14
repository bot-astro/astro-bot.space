import { defineStore } from 'pinia'
import objectHash from 'object-hash'
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

  modifiableSelectedGuildSettings?: DashboardGuildSettings
  saveLoading: boolean
  saveError: boolean
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
    isSelectedGuildSettingsLoading: false,
    modifiableSelectedGuildSettings: undefined,
    saveLoading: false,
    saveError: false,
  }),
  getters: {
    selectedGuild(state) {
      return state.guilds.find(guild => guild.id === state.selectedGuildId)
    },
    // MODIFIED INDICATOR
    areSettingsModified(state) {
      if (state.selectedGuildSettings === undefined || state.modifiableSelectedGuildSettings === undefined)
        return false
      else
        return objectHash(state.selectedGuildSettings) !== objectHash(state.modifiableSelectedGuildSettings)
    },
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
      const { $apiFetch } = useNuxtApp()

      this.selectedGuildId = id

      this.isSelectedGuildSettingsLoading = true
      this.isSelectedGuildError = false

      if (id !== undefined) {
        try {
          const data = await $apiFetch<DashboardGuildSettings>(ApiEndpoints.GUILD_SETTINGS(id))
          this.isSelectedGuildError = false
          this.selectedGuildSettings = structuredClone(data)
          this.modifiableSelectedGuildSettings = structuredClone(data)
          this.isSelectedGuildSettingsLoading = false
          this.saveLoading = false
          this.saveError = false
        }
        catch (e) {
          this.isSelectedGuildSettingsLoading = false
          this.isSelectedGuildError = true
          console.error('Failed fetching guild settings', e)
        }
      }
    },
    async saveModifiedGuildSettings() {
      if (this.selectedGuildId !== undefined && this.modifiableSelectedGuildSettings !== undefined) {
        const { $apiFetch } = useNuxtApp()

        this.saveError = false
        this.saveLoading = true

        try {
          const data = await $apiFetch<DashboardGuildSettings>(ApiEndpoints.GUILD_SETTINGS_UPDATE(this.selectedGuildId), {
            method: 'post',
            body: this.modifiableSelectedGuildSettings,
          })

          this.saveLoading = false
          this.saveError = false
          this.selectedGuildSettings = structuredClone(data)
          this.modifiableSelectedGuildSettings = structuredClone(data)
        }
        catch (e) {
          this.saveLoading = false
          this.saveError = true
          console.error('failed saving guild settings', e)
        }
      }
      else {
        console.error('tried to save modified guild settings without a selected guild id')
      }
    },
    // SETTINGS MODIFIERS
    setAllowMissingAdminPermission(value: boolean) {
      if (this.modifiableSelectedGuildSettings !== undefined)
        this.modifiableSelectedGuildSettings.allow_missing_admin_perm = value
    },
  },
})
