export interface GSError {
  guild_id: string;
  description: string;
  premium_required: boolean;
  guide?: GSErrorGuide;
  timestamp: number;
}

export const enum GSErrorGuide {
  BASIC = "BASIC",
  GENERATOR = "GENERATOR",
  TEMPLATE = "TEMPLATE",
  INTERFACE = "INTERFACE",
  VOICE_ROLE = "VOICE_ROLE"
}

