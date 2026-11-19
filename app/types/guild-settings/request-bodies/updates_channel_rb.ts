export interface UpdatesChannelRB {
  /** null disables the updates channel */
  channel_id: string | null
  /** creates a new channel and uses it, `channel_id` is ignored */
  create_channel?: boolean
}
