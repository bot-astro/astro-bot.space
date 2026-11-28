import {
  mockShowcaseServerCount,
  mockShowcaseServers,
} from '~/data/astro/mocks/home-showcase'

export default function useHomeShowcase() {
  return {
    serverCount: mockShowcaseServerCount,
    formattedServerCount: `${Math.floor(mockShowcaseServerCount / 1000)}k+`,
    servers: mockShowcaseServers,
  }
}
