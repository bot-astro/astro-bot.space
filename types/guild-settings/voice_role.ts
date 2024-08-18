export interface GSVoiceRole {
  id: string;
  role_id: string;
  action: GSVoiceRoleAction;
  permanent_dashboard: boolean;
}

export const enum GSVoiceRoleAction {
  ASSIGN = "ASSIGN",
  REMOVE = "REMOVE",
  TOGGLE = "TOGGLE",
}