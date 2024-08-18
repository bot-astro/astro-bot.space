export interface UserChargebeeSubscriptions {
  /**
   * used upgrades
   */
  upgraded_guilds: UserUpgradedGuild[];
  /**
   * all user subscriptions
   */
  subscriptions: UserSubscription[];
}

export interface UserUpgradedGuild {
  subscription_id: string;
  /**
   * the upgraded guild id
   */
  guild_id: string;
}

export interface UserSubscription {
  subscription_id: string;
  annual: boolean;
  quantities: number;
  used: number;
  available: number;
}