export interface ShowcaseServer {
  name: string
  members: number
  guildId: string
  icon?: string
}

export const mockShowcaseServerCount = 150000

// well-known game and community servers among the biggest (BigQuery GUILD_SNAPSHOT, 2026-11), 18+ and personal servers left out, icons from the Discord API
export const mockShowcaseServers: ShowcaseServer[] = [
  {
    name: 'Live Insaan',
    members: 715875,
    guildId: '550389429567750155',
    icon: '/img/servers/550389429567750155.webp',
  },
  {
    name: 'Dragon Talon Academy',
    members: 364185,
    guildId: '992282055494881411',
    icon: '/img/servers/992282055494881411.webp',
  },
  {
    name: 'TRON DAO Community',
    members: 138874,
    guildId: '915564378676412417',
    icon: '/img/servers/915564378676412417.webp',
  },
  {
    name: 'Garena Delta Force',
    members: 81252,
    guildId: '1288035388925018165',
    icon: '/img/servers/1288035388925018165.webp',
  },
  {
    name: 'Mobile Legends: Bang Bang Philippines',
    members: 69481,
    guildId: '711077629410934794',
    icon: '/img/servers/711077629410934794.webp',
  },
  {
    name: 'Racing Master SEA Official',
    members: 68043,
    guildId: '1313761105377497128',
    icon: '/img/servers/1313761105377497128.webp',
  },
  {
    name: 'Study With Me',
    members: 52796,
    guildId: '770814980194959360',
    icon: '/img/servers/770814980194959360.webp',
  },
  {
    name: 'Apex Legends Indonesia',
    members: 48825,
    guildId: '543459819332567050',
    icon: '/img/servers/543459819332567050.webp',
  },
  {
    name: 'Counter-Strike 2 Polska',
    members: 40317,
    guildId: '924971394037608488',
    icon: '/img/servers/924971394037608488.webp',
  },
  {
    name: 'Blox Fruits Trading & Stock',
    members: 39485,
    guildId: '1522006046963535993',
    icon: '/img/servers/1522006046963535993.webp',
  },
  {
    name: 'Airship Syndicate',
    members: 35698,
    guildId: '989552511608320090',
    icon: '/img/servers/989552511608320090.webp',
  },
  {
    name: 'PUBG MOBILE Espor Türkiye',
    members: 34449,
    guildId: '942054571746947144',
    icon: '/img/servers/942054571746947144.webp',
  },
  {
    name: 'Skill Capped WoW Guides',
    members: 33477,
    guildId: '294958471953252353',
    icon: '/img/servers/294958471953252353.webp',
  },
  {
    name: 'Wolcen Studio',
    members: 30647,
    guildId: '344054657443692545',
    icon: '/img/servers/344054657443692545.webp',
  },
  {
    name: 'Racing Master LATAM Official',
    members: 29782,
    guildId: '1386969629414396084',
    icon: '/img/servers/1386969629414396084.webp',
  },
  {
    name: 'KewDiePie',
    members: 23342,
    guildId: '577253905361010688',
    icon: '/img/servers/577253905361010688.webp',
  },
  {
    name: 'eFootball India',
    members: 22108,
    guildId: '1339906663938920511',
    icon: '/img/servers/1339906663938920511.webp',
  },
  {
    name: 'ARC Raiders Brasil',
    members: 16501,
    guildId: '1412423356593995819',
    icon: '/img/servers/1412423356593995819.webp',
  },
  {
    name: 'Genshin Impact Việt Nam',
    members: 14913,
    guildId: '764883840480968724',
    icon: '/img/servers/764883840480968724.webp',
  },
  {
    name: 'The Division 2',
    members: 13436,
    guildId: '182380174409465856',
    icon: '/img/servers/182380174409465856.webp',
  },
  {
    name: 'Black Ops Zombies',
    members: 13397,
    guildId: '1258390571546837022',
    icon: '/img/servers/1258390571546837022.webp',
  },
  {
    name: 'Valorant Community',
    members: 9877,
    guildId: '953262414776905748',
    icon: '/img/servers/953262414776905748.webp',
  },
  {
    name: 'Rockstar Games',
    members: 9557,
    guildId: '868122239529287750',
    icon: '/img/servers/868122239529287750.webp',
  },
  {
    name: 'Honkai: Star Rail Indonesia',
    members: 9109,
    guildId: '1068139995103244289',
    icon: '/img/servers/1068139995103244289.webp',
  },
]
