export interface GSVoiceRole {
  /**
   * id of the voice channel the connection is attached to
   */
  id: string
  role_id: string
  action: GSVoiceRoleAction
  /**
   * whether the role is kept after leaving the channel
   */
  permanent: boolean
}

export enum GSVoiceRoleAction {
  ASSIGN = 'ASSIGN',
  REMOVE = 'REMOVE',
  TOGGLE = 'TOGGLE',
}
