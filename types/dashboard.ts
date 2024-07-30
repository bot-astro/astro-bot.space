export interface DashboardSection {
  id: number
  name: string
  description: string
  icon: string
  order: number
  path: string
}

/**
 * Auild obtained when fetching the list of guilds of a user
 *
 * @property id
 * @property name
 * @property icon can be undefined if the guild has no icon
 * @property can_manage whether the logged-in user has permissions to manage the Astro guild settings
 */
export interface DashboardGuild {
  id: string
  name: string
  icon?: string
  can_manage: boolean
}