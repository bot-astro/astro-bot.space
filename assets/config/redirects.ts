export const redirects: Array<Redirect> = [
  {
    id: 'github',
    path: '/github',
    name: 'GitHub',
    target: 'https://github.com/bot-astro',
  },
  {
    id: 'invite',
    path: '/invite',
    name: 'Invite',
    target: 'https://discord.com/oauth2/authorize?client_id={APPLICATION_ID}&scope=bot+applications.commands&permissions=8&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fauth-callback',
  },
  {
    id: 'invite-guild',
    path: '/invite-guild',
    name: 'Invite',
    target: 'https://discord.com/oauth2/authorize?client_id={APPLICATION_ID}&scope=bot+applications.commands&permissions=8&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fauth-callback&guild_id={GUILD_ID}&disable_guild_select=true',
  },
  {
    id: 'discord-ultimate',
    path: '/discord-ultimate',
    name: 'Discord ultimate',
    target: 'https://discord.com/application-directory/{APPLICATION_ID}/premium',
  },
  {
    id: 'support',
    path: '/support',
    name: 'support server',
    target: 'https://discord.com/invite/yeXwVhg',
  },
]
