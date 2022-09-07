import { defineStore } from 'pinia'

let requestedDiscordUser = false

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionToken: null,
    discordUser: null
  } as AuthStore),
  actions: {
    async fetchDiscordUser() {
      if (requestedDiscordUser || this.sessionToken === null) {
        return
      }

      requestedDiscordUser = true

      this.discordUser = await $fetch<DiscordUser>('/users/@me/discord', {
        baseURL: useRuntimeConfig().apiBaseUrl,
        headers: {
          accept: 'application/json',
          authorization: this.sessionToken
        },
        async onResponseError({ response }) {
          if (response.status === 401) {
            useAuthStorage().clearAuthToken()
          }
        }
      }).catch(() => {
        requestedDiscordUser = false
      }) || null

      return this.discordUser
    }
  }
})
