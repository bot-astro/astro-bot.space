interface ChargebeeCheckoutOptions {
  hostedPage: () => Promise<unknown>
  success?: (hostedPageId: string) => void
  close?: () => void
  error?: (error: unknown) => void
}

interface ChargebeeInstance {
  openCheckout: (options: ChargebeeCheckoutOptions) => void
}

declare const Chargebee: {
  init: (options: { site: string }) => ChargebeeInstance
  getInstance: () => ChargebeeInstance
}
