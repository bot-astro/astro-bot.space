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
  /**
   * how many guild upgrades this subscription can be used for
   */
  quantity: number;
}