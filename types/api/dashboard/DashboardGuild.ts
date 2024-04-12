import type {DashboardGuildSettings} from "~/types/api/dashboard/DashboardGuildSettings";

export interface DashboardGuild {
  id: string,
  name: string,
  icon?: string,
  can_manage: boolean,
  settings?: DashboardGuildSettings
}