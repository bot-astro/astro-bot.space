declare global {
  interface Window {
    particlesJS?: (tag_id: string, params: unknown) => void
  }
}

export {}
