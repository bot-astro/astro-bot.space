import type {GSEntitlement} from "~/types/guild-settings/entitlement";
import type {GSTemplate} from "~/types/guild-settings/template";
import type {GSVoiceRole} from "~/types/guild-settings/voice_role";
import type {GSGenerator} from "~/types/guild-settings/generator";
import type {GSInterface} from "~/types/guild-settings/interface";

export interface GuildSettings {
  guild_id: string;
  upgraded_by_user_id: string | null;
  /**
   * true if bot can work without admin perms, false otherwise
   */
  allow_missing_admin_perm: boolean;
  entitlements: GSEntitlement[];
  templates: GSTemplate[];
  connections: GSVoiceRole[];
  generators: GSGenerator[];
  interfaces: GSInterface[];
}