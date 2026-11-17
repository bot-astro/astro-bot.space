/**
 * Channel where Astro posts its announcements, status updates and alerts about the server,
 * both fields are null when it is disabled
 */
export interface UpdatesChannel {
  channel_id: string | null
  status: UpdatesChannelStatus | null
}

export enum UpdatesChannelStatus {
  OK = 'OK',
  /** Astro lacks Manage Webhooks, so it can't follow the announcements or send alerts */
  MISSING_PERMISSION = 'MISSING_PERMISSION',
  /** the alert webhook has been deleted */
  WEBHOOK_MISSING = 'WEBHOOK_MISSING',
}
