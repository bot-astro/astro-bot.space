export interface GSGenerator {
  id: string;
  /**
   * id of a generator to use as fallback, null for no fallback
   */
  fallback_id: string | null;
  queue_mode: boolean;
  default_name: string;
  default_locked_name: string | null;
  default_hidden_name: string | null;
  /**
   * 0 for no user limit
   */
  user_limit: number;
  /**
   * 0 for no bitrate
   */
  bitrate: number;
  /**
   * category id, null for no category
   */
  category: string | null;
  permissions_inherited: GSGeneratorPermissionsInherited;
  /**
   * target role id for permissions modifications, null for @everyone
   */
  permissions_target_role: string | null;
  /**
   * moderator role id, null for no moderator role
   */
  permissions_immune_role: string | null;
  /**
   * permission bits (0 = no perms)
   */
  owner_permissions: number;
  /**
   * owner role id
   */
  owner_role: string | null;
  initial_state: GSGeneratorVCState;
  initial_position: GSGeneratorInitialPosition;
  rename_conditions: GSGeneratorRenameConditions;
  commands_settings: GSGeneratorCommandsSettings;

  auto_chat: boolean;
  auto_waiting: boolean;

  chat_category: string | null;
  chat_topic: string | null;
  chat_nsfw: boolean;
  /**
   * 0 for no slowmode
   */
  chat_slowmode: number;
  chat_permissions_inherited: GSGeneratorPermissionsInherited;
  default_chat_name: string;
  default_chat_text: string | null;
  default_chat_text_embed: boolean;
  /**
   * **index** of the interface to send in the chat (this is such terrible design I know)
   */
  chat_interface: number;

  waiting_category: string | null;
  waiting_permissions_inherited: GSGeneratorPermissionsInherited;
  default_waiting_name: string;
  /**
   * 0 for no bitrate
   */
  waiting_bitrate: number;
  waiting_position: GSGeneratorInitialPosition;
  /**
   * 0 for no user limit
   */
  waiting_user_limit: number;
}

export const enum GSGeneratorPermissionsInherited {
  NONE = "NONE",
  CATEGORY = "CATEGORY",
  GENERATOR = "GENERATOR"
}

export const enum GSGeneratorInitialPosition {
  BEFORE = "BEFORE",
  AFTER = "AFTER",
  BOTTOM = "BOTTOM"
}

export const enum GSGeneratorVCState {
  UNLOCKED = "UNLOCKED",
  LOCKED = "LOCKED",
  HIDDEN = "HIDDEN",
  UNHIDDEN = "UNHIDDEN"
}

export interface GSGeneratorRenameConditions {
  state_change: boolean;
  owner_change: boolean;
  renamed: boolean;
  activity_change: boolean;
}

export interface GSGeneratorCommandsSettings {
  /**
   * 99 for no limit
   */
  max_user_limit: number;
  /**
   * 0 for no limit
   */
  min_user_limit: number;
  /**
   * null for no limit
   */
  max_bitrate: number | null;
  /**
   * 8000 for no limit
   */
  min_bitrate: number;
  badwords_allowed: boolean;
}