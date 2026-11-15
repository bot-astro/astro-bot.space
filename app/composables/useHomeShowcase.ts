import {
  mockShowcaseServerCount,
  mockShowcaseServers,
} from '~/data/astro/mocks/home-showcase'

export default function useHomeShowcase() {
  return {
    serverCount: mockShowcaseServerCount,
    servers: mockShowcaseServers,
  }
}
