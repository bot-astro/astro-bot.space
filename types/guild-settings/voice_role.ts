export interface GSVoiceRole {
  id: string;
  role_id: string;
  action: GSVoiceRoleAction;
  permanent: boolean;
}

export const enum GSVoiceRoleAction {
  ASSIGN = "ASSIGN",
  REMOVE = "REMOVE",
  TOGGLE = "TOGGLE",
}