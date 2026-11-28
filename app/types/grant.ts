export interface Grant {
  id: string
  clientId: string
  clientName: string
  scopes: string[]
  createdAt: string
  lastUsedAt: string | null
}
