export interface GSError {
  id: string
  guild_id: string
  code: string
  description: string
  premium_required: boolean
  guide: GSErrorGuide | null
  timestamp: number
}

export enum GSErrorGuide {
  BASIC = 'BASIC',
  GENERATOR = 'GENERATOR',
  TEMPLATE = 'TEMPLATE',
  INTERFACE = 'INTERFACE',
  VOICE_ROLE = 'VOICE_ROLE',
}
