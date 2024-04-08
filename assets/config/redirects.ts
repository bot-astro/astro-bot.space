export const redirects: Array<Redirect> = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/bot-astro',
  },
  {
    id: 'invite',
    name: 'Invite',
    url: 'https://discord.com/oauth2/authorize?client_id={APPLICATION_ID}&scope=bot+applications.commands&permissions=8',
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
