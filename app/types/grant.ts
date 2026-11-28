export interface Grant {
  id: string
  client_id: string
  client_name: string
  scopes: string[]
  created_at: string
  last_used_at: string | null
}
