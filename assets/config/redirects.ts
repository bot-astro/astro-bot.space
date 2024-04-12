export const redirects: Array<Redirect> = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/bot-astro',
  },
  {
    id: 'invite',
    name: 'Invite',
    url: 'https://discord.com/oauth2/authorize?client_id={APPLICATION_ID}&scope=bot+applications.commands&permissions=8&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fauth-callback',
  },
  {
    id: 'invite-guild',
    name: 'Invite',
    url: 'https://discord.com/oauth2/authorize?client_id={APPLICATION_ID}&scope=bot+applications.commands&permissions=8&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fauth-callback&guild_id={GUILD_ID}&disable_guild_select=true',
  },
  {
    id: 'discord-premium',
    name: 'Discord premium',
    url: 'https://discord.com/application-directory/{APPLICATION_ID}/premium',
  },
  {
    id: 'support',
    name: 'support server',
    url: 'https://discord.com/invite/yeXwVhg',
  },
]
