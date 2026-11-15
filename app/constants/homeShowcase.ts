export interface ShowcaseMember {
  name: string
  color: string
}

export interface ShowcaseChannel {
  name: string
  members: ShowcaseMember[]
}

export interface ShowcaseScenario {
  id: string
  template: string
  yourChannel: string
  others: ShowcaseChannel[]
  ultimate: boolean
}

export const showcaseYou: ShowcaseMember = { name: 'Nova', color: '#a855f7' }

const kai = { name: 'Kai', color: '#38bdf8' }
const mika = { name: 'Mika', color: '#f59e0b' }
const zoe = { name: 'Zoe', color: '#34d399' }
const luna = { name: 'Luna', color: '#ec489a' }
const jax = { name: 'Jax', color: '#f87171' }

export const showcaseScenarios: ShowcaseScenario[] = [
  {
    id: 'gaming',
    template: '{activity_emoji} {activity_name} | {nickname}',
    yourChannel: '⛏️ Minecraft | Nova',
    others: [
      { name: '🎯 Valorant | Luna', members: [luna, jax] },
      { name: '🚗 Rocket League | Kai', members: [kai] },
      { name: '⚔️ Elden Ring | Mika', members: [mika, zoe] },
    ],
    ultimate: true,
  },
  {
    id: 'incremental',
    template: 'Lounge {n}',
    yourChannel: 'Lounge 3',
    others: [
      { name: 'Lounge 1', members: [kai, mika] },
      { name: 'Lounge 2', members: [zoe] },
    ],
    ultimate: true,
  },
  {
    id: 'squad',
    template: 'Squad {nato}',
    yourChannel: 'Squad Charlie',
    others: [
      { name: 'Squad Alpha', members: [luna, jax, kai] },
      { name: 'Squad Bravo', members: [mika, zoe] },
    ],
    ultimate: true,
  },
  {
    id: 'personal',
    template: "📚 {nickname}'s study room",
    yourChannel: "📚 Nova's study room",
    others: [
      { name: "📚 Zoe's study room", members: [zoe] },
      { name: "📚 Kai's study room", members: [kai, mika] },
    ],
    ultimate: false,
  },
]
